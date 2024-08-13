export interface Course {
  id?: number;
  title: string;
  description: string;
  course_banner_url?: string;
  updated_at?: string;
  end_date?: string;
  created_at?: string;
  total_size_in_mb?: number;
  course_files?: [
    {
      id: string;
      name: string;
      file_url: string;
    }
  ];
}
