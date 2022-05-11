export interface Photo {
  href: string;
  data: {nasa_id: string; title: string;}[];
  links: {href: string; rel: string; render?: string;}[]
  }
  
  interface PaginationObject {
    url?: string;
    page: number;
    per_page: number;
    next_page: number;
  }
  
  export declare type Photos = PaginationObject & {
    collection: {
      items: Photo[];
      metadata: {total_hits: number;};
    };

  };
  export declare type PhotosWithTotalResults = Photos & {
    total_results: number;
  };