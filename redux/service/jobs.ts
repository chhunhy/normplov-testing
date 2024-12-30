import { normPlovApi } from "../api";

export interface GetJobsFilters {
  search?: string;
  page?: number;
  category?: string;
  location?: string;
}

export interface Job {
  uuid: string;
  title: string;
  company_name: string;
  location: string;
  description: string;
  job_type: string;
  requirements: string[];
  responsibilities: string[];
  facebook_url?: string;
  email?: string;
  phone?: string;
  website?: string;
  created_at: string;
  closing_date: string;
}

export interface JobsResponse {
  items: Job[];
  metadata: {
    page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
  };
}

export const jobsApi = normPlovApi.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query<JobsResponse, GetJobsFilters>({
      query: (filters) => {
        const query = new URLSearchParams();
        if (filters.search) query.append("search", filters.search);
        if (filters.page) query.append("page", filters.page.toString());
        if (filters.category) query.append("category", filters.category);
        if (filters.location) query.append("location", filters.location);

        return {
          url: `api/v1/jobs?${query.toString()}`,
          method: "GET",
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetJobsQuery } = jobsApi;
