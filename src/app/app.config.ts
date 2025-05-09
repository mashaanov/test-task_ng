import { provideRouter, Routes } from "@angular/router";
import { ApplicationConfig } from "@angular/core";

import HomePage from "./pages/home/home-page";
import ProductDetailsPage from "./pages/product-details/product-details";
import NotFoundPage from "./pages/not-found/not-found";

const appRoutes: Routes = [
  { path: "", component: HomePage, pathMatch: "full" },
  { path: "products/:id", component: ProductDetailsPage },
  { path: "**", component: NotFoundPage },
];
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes)],
};
