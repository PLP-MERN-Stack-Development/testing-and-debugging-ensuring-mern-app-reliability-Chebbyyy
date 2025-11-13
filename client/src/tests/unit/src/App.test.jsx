import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { vi } from 'vitest';

// Mock the API
vi.mock('./lib/api', () => ({
  getBugs: vi.fn(() => Promise.resolve({ data: [] })),
  createBug: vi.fn(() => Promise.resolve()),
}));

import { getBugs, createBug } from './lib/api';

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the app title', () => {
    render(<App />);
    expect(screen.getByText('Bug Tracker')).toBeInTheDocument();
  });

  it('loads and displays bugs', async () => {
    getBugs.mockResolvedValueOnce({
      data: [{ _id: '1', title: 'Test Bug', description: 'Desc', status: 'open' }],
    });
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('Test Bug')).toBeInTheDocument();
    });
  });

  it('adds a new bug', async () => {
    getBugs.mockResolvedValueOnce({ data: [] });
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText('Bug Title'), {
      target: { value: 'New Bug' },
    });
    fireEvent.change(screen.getByPlaceholderText('Bug Description'), {
      target: { value: 'New Desc' },
    });
    fireEvent.click(screen.getByText('Add Bug'));
    await waitFor(() => {
      expect(createBug).toHaveBeenCalledWith({
        title: 'New Bug',
        description: 'New Desc',
      });
    });
  });
});