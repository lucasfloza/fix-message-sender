import apiClient from '../api/client';
import type { ApiResponse, PaginatedResponse } from '../types/api';
import type {
  FixMessage,
  CreateFixMessageRequest,
} from '../types/services/fixMessage';

/**
 * Service for FIX Message operations
 * Handles all API calls related to FIX messages
 */
class FixMessageService {
  private readonly basePath = '/fix-messages';

  /**
   * Get all FIX messages
   */
  async getAll(page = 0, size = 10): Promise<PaginatedResponse<FixMessage>> {
    const response = await apiClient.get<PaginatedResponse<FixMessage>>(
      `${this.basePath}?page=${page}&size=${size}`
    );
    return response.data;
  }

  /**
   * Get a FIX message by ID
   */
  async getById(id: string): Promise<FixMessage> {
    const response = await apiClient.get<ApiResponse<FixMessage>>(
      `${this.basePath}/${id}`
    );
    return response.data.data;
  }

  /**
   * Create a new FIX message
   */
  async create(message: CreateFixMessageRequest): Promise<FixMessage> {
    const response = await apiClient.post<ApiResponse<FixMessage>>(
      this.basePath,
      message
    );
    return response.data.data;
  }

  /**
   * Update a FIX message
   */
  async update(id: string, message: Partial<FixMessage>): Promise<FixMessage> {
    const response = await apiClient.put<ApiResponse<FixMessage>>(
      `${this.basePath}/${id}`,
      message
    );
    return response.data.data;
  }

  /**
   * Delete a FIX message
   */
  async delete(id: string): Promise<void> {
    await apiClient.delete(`${this.basePath}/${id}`);
  }
}

export default new FixMessageService();
