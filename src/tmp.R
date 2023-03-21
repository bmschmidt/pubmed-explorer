library(tigris)
library(sf)
library(tidyverse)
ne1 = c("RI", "MA", "NH", "VT", "ME", "CT") |> 
  map_dfr(county_subdivisions) |>
  erase_water() |>
  select(NAME, GEOID)|> st_transform(crs="EPSG:26986")
ne = ne1 |> 
   st_buffer(dist = 800)
fivers = ne |>
   st_intersection(ne) |> filter(NAME < NAME.1) |>
   st_intersection(ne) |> filter(NAME.1 < NAME.2) |>
   st_intersection(ne) |> filter(NAME.2 < NAME.3) |>
   st_intersection(ne) |> filter(NAME.3 < NAME.4)
