// eslint-disable-next-line @typescript-eslint/ban-types
export type Prettify<T> = { [k in keyof T]: T[k] } & {};

type VercelRegions =
  | "arn1"
  | "bom1"
  | "cdg1"
  | "cle1"
  | "cpt1"
  | "dub1"
  | "fra1"
  | "gru1"
  | "hkg1"
  | "hnd1"
  | "iad1"
  | "icn1"
  | "kix1"
  | "lhr1"
  | "pdx1"
  | "sfo1"
  | "sin1"
  | "syd1";

export interface RouteSegmentConfig {
  dynamic: "auto" | "force-dynamic" | "error" | "force-static";
  dynamicParams: boolean;
  revalidate: false | 0 | number;
  fetchCache:
    | "auto"
    | "default-cache"
    | "only-cache"
    | "force-cache"
    | "force-no-store"
    | "default-no-store"
    | "only-no-store";
  runtime: "nodejs" | "edge";
  preferredRegion: "auto" | "global" | "home" | VercelRegions | VercelRegions[];
  maxDuration: number;
}
