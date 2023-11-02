// To parse this data:
//
//   import { Convert, Foto } from "./file";
//
//   const foto = Convert.toFoto(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Foto {
    page:          number;
    per_page:      number;
    photos:        Photo[];
    total_results: number;
    next_page:     string;
}

export interface Photo {
    id:               number;
    width:            number;
    height:           number;
    url:              string;
    photographer:     string;
    photographer_url: string;
    photographer_id:  number;
    avg_color:        string;
    src:              Src;
    liked:            boolean;
    alt:              string;
}

export interface Src {
    original:  string;
    large2x:   string;
    large:     string;
    medium:    string;
    small:     string;
    portrait:  string;
    landscape: string;
    tiny:      string;
}