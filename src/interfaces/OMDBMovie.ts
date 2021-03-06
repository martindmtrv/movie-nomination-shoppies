export interface OMDBMovie extends Record<string, any> {
    Title: string;
    Year: string;
    imdbID: string;
    Response?: string;
    Poster: string;
}
