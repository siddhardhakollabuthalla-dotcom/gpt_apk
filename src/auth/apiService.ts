/**
 * API Service for authenticated requests
 * Automatically includes authorization header and handles token refresh
 */

const ACCESS_TOKEN_KEY = "auth_access_token";
const REFRESH_TOKEN_KEY = "auth_refresh_token";

interface ApiConfig extends RequestInit {
  skipAuth?: boolean;
  retryOnTokenRefresh?: boolean;
}

interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

class ApiService {
  private isRefreshing = false;
  private refreshPromise: Promise<void> | null = null;

  private getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  /**
   * Refresh the access token using the refresh token
   */
  private async refreshAccessToken(): Promise<void> {
    if (this.isRefreshing) {
      // If already refreshing, wait for the previous request to complete
      if (this.refreshPromise) {
        return this.refreshPromise;
      }
    }

    this.isRefreshing = true;
    this.refreshPromise = (async () => {
      try {
        const refreshToken = this.getRefreshToken();
        if (!refreshToken) {
          this.clearTokens();
          throw new Error("No refresh token available");
        }

        const response = await fetch("/api/auth/refresh", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${refreshToken}`,
          },
        });

        if (!response.ok) {
          this.clearTokens();
          throw new Error("Token refresh failed");
        }

        const data = (await response.json()) as ApiResponse<{
          accessToken: string;
          refreshToken: string;
          expiresIn: number;
        }>;
        if (data.success && data.data) {
          const { accessToken, refreshToken: newRefreshToken, expiresIn } = data.data;
          const expiresAt = new Date().getTime() + expiresIn * 1000;

          localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
          localStorage.setItem(REFRESH_TOKEN_KEY, newRefreshToken);
          localStorage.setItem("auth_token_expiry", expiresAt.toString());
        } else {
          this.clearTokens();
          throw new Error(data.error || "Token refresh failed");
        }
      } catch (error) {
        this.clearTokens();
        throw error;
      } finally {
        this.isRefreshing = false;
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }

  private clearTokens(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem("auth_token_expiry");
    localStorage.removeItem("auth_user");
  }

  private async handleResponse<T>(
    response: Response,
    originalRequest: Request,
    config: ApiConfig,
  ): Promise<ApiResponse<T>> {
    // Handle 401 Unauthorized - try to refresh token
    if (response.status === 401 && config.retryOnTokenRefresh !== false) {
      try {
        await this.refreshAccessToken();

        // Retry the original request with new token
        const retryHeaders = new Headers(originalRequest.headers);
        retryHeaders.set("Authorization", `Bearer ${this.getAccessToken()}`);

        const retryResponse = await fetch(originalRequest.url, {
          ...originalRequest,
          headers: retryHeaders,
        });

        if (!retryResponse.ok) {
          return {
            success: false,
            error: `Request failed: ${retryResponse.statusText}`,
          };
        }

        return (await retryResponse.json()) as ApiResponse<T>;
      } catch (error) {
        // Token refresh failed, clear auth data and redirect to login
        window.location.href = "/Login";
        return {
          success: false,
          error: "Session expired. Please login again.",
        };
      }
    }

    if (!response.ok) {
      const errorData = (await response.json().catch(() => ({}))) as {
        error?: string;
        message?: string;
      };
      return {
        success: false,
        error: errorData.error || errorData.message || `Request failed: ${response.statusText}`,
      };
    }

    const data = (await response.json()) as ApiResponse<T>;
    return data;
  }

  /**
   * Make an authenticated GET request
   */
  async get<T = unknown>(url: string, config?: ApiConfig): Promise<ApiResponse<T>> {
    return this.request<T>(url, { ...config, method: "GET" });
  }

  /**
   * Make an authenticated POST request
   */
  async post<T = unknown>(
    url: string,
    body?: unknown,
    config?: ApiConfig,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      ...config,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  /**
   * Make an authenticated PUT request
   */
  async put<T = unknown>(url: string, body?: unknown, config?: ApiConfig): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      ...config,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  /**
   * Make an authenticated DELETE request
   */
  async delete<T = unknown>(url: string, config?: ApiConfig): Promise<ApiResponse<T>> {
    return this.request<T>(url, { ...config, method: "DELETE" });
  }

  /**
   * Make an authenticated PATCH request
   */
  async patch<T = unknown>(
    url: string,
    body?: unknown,
    config?: ApiConfig,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      ...config,
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  /**
   * Generic request method with token handling
   */
  private async request<T = unknown>(url: string, config: ApiConfig = {}): Promise<ApiResponse<T>> {
    try {
      const { skipAuth = false, headers = {}, ...otherConfig } = config;

      const defaultHeaders = new Headers(headers);
      defaultHeaders.set("Content-Type", "application/json");

      // Add authorization header if not skipping auth
      if (!skipAuth) {
        const token = this.getAccessToken();
        if (token) {
          defaultHeaders.set("Authorization", `Bearer ${token}`);
        }
      }

      const request = new Request(url, {
        ...otherConfig,
        headers: defaultHeaders,
      });

      const response = await fetch(request);
      return this.handleResponse<T>(response, request, config);
    } catch (error) {
      console.error("API request failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "An error occurred",
      };
    }
  }
}

export const apiService = new ApiService();
