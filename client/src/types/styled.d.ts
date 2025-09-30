/* eslint-disable @typescript-eslint/no-explicit-any */
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      [key: string]: any;
    };
    spacing: {
      [key: string]: any;
    };
    breakpoints: {
      [key: string]: any;
    };
  }
}
