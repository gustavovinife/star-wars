import { HomePage } from "../presentation/pages/home/page";
import { DetailsPage } from "../presentation/pages/details/page";

export type Route = {
  path: string;
  component: React.ComponentType;
};

export const routes: Route[] = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/details/:type/:id",
    component: DetailsPage,
  },
];
