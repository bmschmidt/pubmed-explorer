---
title: The shape of biomedical research
---

:::{.scrollership scroller-type="deepscatter"}

:::chunk

## The shape of biomedical research

This interactive visualization displays 21 million scientific papers collected in the [PubMed database](https://pubmed.ncbi.nlm.nih.gov), maintained by the United States National Library of Medicine and encompassing all biomedical and life science fields of research.

You can scroll the narration in the left part of the screen, and interact with the visualization in the right part of the screen. Zooming in loads additional papers. Information about each individual paper appears on mouse-over. Search over titles is available in the upper-right corner.

Please see [our paper](https://www.biorxiv.org/content/10.1101/xxx) for more details.

:::barchartprep
Prep goes here to pre-allocate some deepscatter data.
:::

```api
max_points: 750_000
zoom_balance: .38
point_size: 1.2
alpha: 45
zoom_align: right
source_url: "https://static.nomic.ai/tiles/pubmed"
background_color: "#EFEFEF"
click_function: |
   window.open(`https://pubmed.ncbi.nlm.nih.gov/${datum.pmid}/`, '_blank')
background_options:
  size: 1
  mouseover: true
  opacity: 0.8
zoom:
  bbox:
    x: [-250, 250]
    y: [-250, 250]
tooltip_html: |
  return `<div style="min-width: 240px">${datum.title} <em>${datum.journal}</em> (${datum.year})</div>`
encoding:
  foreground:
    field: labels
    lambda: d => d !== 'unlabeled'
  color:
    field: labels
    range: ["lightgrey", "#B79762", "#009271", "#004D43", "#5B4534", "#E83000", "#008941", "#549E79", "black", "#6F0062", "#006FA6", "#b65141", "#A4E804", "#8FB0FF", "#6B002C", "#3B5DFF", "#1CE6FF", "#FF9408", "#BA0900", "#1B4400", "#D790FF", "#0089A3", "#4FC601", "#00FECF", "#5A0007", "#00C2A0", "#FFB500", "#BC23FF", "#7A4900", "#CC0744", "#C20078", "#0000A6", "#aeaa00", "#FF2F80", "#FF34FF", "#FF4A46", "#FF90C9", "#6508ba", "#C895C5"]
    "domain": ["unlabeled", "microbiology", "neurology", "pediatric", "pharmacology", "physiology", "chemistry", "education", "cancer", "virology", "surgery", "biochemistry", "ophthalmology", "immunology", "rehabilitation", "veterinary", "cardiology", "pathology", "psychiatry", "genetics", "dermatology", "environment", "nutrition", "radiology", "psychology", "engineering", "gynecology", "physics", "infectious", "anesthesiology", "computation", "material", "neuroscience", "nursing", "ecology", "bioinformatics", "healthcare", "ethics", "optics"]
```

:::


:::chunk

## Introduction

Over one million articles are being currently published every year in biomedicine and life sciences.
The sheer amount of publications makes it difficult to
track the evolution of biomedical publishing as a whole. 
Search engines like PubMed and Google Scholar allow to find specific
papers given suitable keywords and follow the citation networks that
these papers are embedded in, yet none of them allows to explore the
biomedical literature 'landscape' from a global perspective. This makes
it hard to see how research topics evolve over time, how different
fields are related to each other, or how new methods and techniques are
adopted in different fields.

To answer such questions,
we provide a bird's-eye view on the biomedical literature.

```api

duration: 2000

```
:::

:::chunk

Here we offer an approach that enables all of the above: a
global two-dimensional atlas of the biomedical and life science
literature which is based on the abstracts of all 21 million English
language articles contained in the PubMed database. To create the map,
we embedded the abstracts into two dimensions using the
transformer-based large language model [PubMedBERT](https://dl.acm.org/doi/10.1145/3458754) combined
with the neighbor embedding method [t-SNE](https://www.jmlr.org/papers/v9/vandermaaten08a.html).

Our embedding is based on the abstract texts alone, and did not use any
further metadata or information on citations or references.


```api
max_points: 750_000
duration: 2000
encoding:
  jitter_radius: null
  jitter_speed: null
```

:::

:::chunk

This visualization facilitates exploration of the
biomedical literature and can reveal aspects of the data that would not
be easily noticed with other analysis methods. We showcase the power of
our approach in four examples: 

1. [The emergence of the Covid-19 literature.](#covid-19)
2. [The evolution of different subfields of neuroscience](#neuroscience)
3. The uptake of machine learning (???)
4. [The distribution of gender imbalance across biomedical fields.](#gender)

The shared strategy in all of these is to formulate specific hypotheses
about the data based on the visual exploration, and then to confirm them by a dedicated statistical
analysis of the original high-dimensional dataset.

:::



:::chunk

The majority of the displayed paper were published between 1970 and 2021. Here darker colors correspond to earlier publication years and lighter colors correspond to more recent papers.

```api
encoding:
  x: 
    field: time.x
    transform: literal
  y: 
    field: time.y
    transform: literal
  foreground: null
  color:
    field: year
    domain: [1970, 2022]
    range: viridis
```

:::

:::chunk

Our map, however, is not predominantly organized by time. Most regions contain articles from multiple different 
eras in fairly close proximity; but when zooming in closer, temporal
periods often become well segregated.

```api
encoding:
  foreground: null
  x: 
    field: x
    transform: literal
  y: 
    field: y
    transform: literal
```

:::


:::chunk

We labeled the dataset by selecting 38 keywords contained in journal
titles that reflected the general topic of the paper. We based our
choice of keywords on lists of medical specialties and life science
branches that appeared frequently in the journal titles in our dataset.

```api
encoding:
  x: 
    field: x
  y: 
    field: y
  foreground:
    field: labels
    lambda: d => d !== 'unlabeled'
  color: null
background_options:
  opacity: [.2, 1]
  size: [.5, 1]
```

```buttonset
label: Subjects
target: "encoding.foreground.lambda"
clone:
  - "encoding.foreground.lambda"
api:
  background_options:
    opacity: [.05, 2]
    size: [.1, 2]

  duration: 450
  alpha: 100
  encoding:
    color: null
    foreground:
      field: labels
      lambda: d => d !== 'unlabeled'
pattern: 'd => d == "${value}"'
values: ["unlabeled", "dermatology", "physiology", "genetics", "gynecology", "surgery", "neurology", "ophthalmology", "material", "radiology", "veterinary", "physics", "biochemistry", "cardiology", "nursing", "engineering", "chemistry", "psychiatry", "neuroscience", "virology", "environment", "cancer", "pediatric", "pathology", "nutrition", "microbiology", "education", "bioinformatics", "ecology", "rehabilitation", "optics", "immunology", "pharmacology", "psychology"]
```


Papers were assigned a label if their journal title contained that term,
either capitalized or not, and were left unlabeled otherwise. Journal
titles containing more than one term were assigned randomly to one of
them. About a third of the papers in the dataset have labels.

:::

:::chunk

Our journal-based labels do not constitute the ground truth for the
topic of each paper, and so the highest possible classification accuracy
is likely well below 100%. Nevertheless, we reasoned that the higher the
classification accuracy, the better the embedding, and found this metric
to be useful to compare different representations.

```api
background_options:
  opacity: [.2, 1]
  size: [.5, 1]
duration: 1450
alpha: 100
labels:
  url: "https://static.nomic.ai/tiles/pubmed/labels.geojson"
  name: labels
  label_field: labels
  size_field: undefined
encoding:
  x: 
    field: x
  y: 
    field: y
  foreground:
    field: labels
    lambda: d => d !== 'unlabeled'
  color:
    field: labels
    range: ["lightgrey", "#B79762", "#009271", "#004D43", "#5B4534", "#E83000", "#008941", "#549E79", "black", "#6F0062", "#006FA6", "#b65141", "#A4E804", "#8FB0FF", "#6B002C", "#3B5DFF", "#1CE6FF", "#FF9408", "#BA0900", "#1B4400", "#D790FF", "#0089A3", "#4FC601", "#00FECF", "#5A0007", "#00C2A0", "#FFB500", "#BC23FF", "#7A4900", "#CC0744", "#C20078", "#0000A6", "#aeaa00", "#FF2F80", "#FF34FF", "#FF4A46", "#FF90C9", "#6508ba", "#C895C5"]
    "domain": ["unlabeled", "microbiology", "neurology", "pediatric", "pharmacology", "physiology", "chemistry", "education", "cancer", "virology", "surgery", "biochemistry", "ophthalmology", "immunology", "rehabilitation", "veterinary", "cardiology", "pathology", "psychiatry", "genetics", "dermatology", "environment", "nutrition", "radiology", "psychology", "engineering", "gynecology", "physics", "infectious", "anesthesiology", "computation", "material", "neuroscience", "nursing", "ecology", "bioinformatics", "healthcare", "ethics", "optics"]
zoom:
  bbox: {"x":[-200.191034848208633,200.45313346069492],"y":[-191.55286840817564,191.544651330406]}
```



:::

:::chunk

We used PubMedBERT [@pubmedbert] to obtain a numerical representation of
each abstract. Specifically, we used the [HuggingFace's `transformers`](/)
library and the publicly released [PubMedBERT model.](/)

:::TODO
Pubmed BERT link.
Transformers link
:::

In our prior work[^Gonzalez2022], we used the
bag-of-words representation of PubMed abstracts and found we obstained the the highest $k$NN accuracy using the TF-IDF (term frequency inverse document frequency) representation with log-scaling. For computational
convenience we used truncated SVD to reduce dimensionality to 300, the largest dimensionality we could obtain given our RAM resources. (Note that we did not use SVD when using the BERT representation and worked directly with the 768-dimensional representation.) 

[^Gonzalez2022]: TODO, Full cite

```api
encoding:
  x:
    field: tfidf.x
    transform: literal
  y:
    field: tfidf.y
    transform: literal
```

```button
label: "TF-IDF"
api:
  duration: 4000
  encoding:
    x:
      field: tfidf.x
      transform: literal
    y:
      field: tfidf.y
      transform: literal
```

```button
label: "PubMedBERT"
api:
  duration: 4000
  encoding:
    filter: null
    x:
      field: x
      transform: literal
    y:
      field: y
      transform: literal
```

As you can see, the embeddings based on the TF-IDF and PubMedBERT representation showed
similar large-scale organization.

For a comprehensive statistical comparison, see the full paper.

:::

:::chunk

Looking at abstracts, we can also start to tell things about the types of work done.
Here, for instance, we've parsed out every place in the abstracts where the sample size for a project is indicated (`n = 300`, `n = 100`, etc.). Darker colors, representing smaller sample sizes, are clustered in specific areas of the map.


```api
point_size: 3
encoding:
  x: 
    field: x
  y: 
    field: y
  foreground: null
  filter:
    field: sample_size
    op: gt
    a: 0
  color:
    field: sample_size
    domain: [1, 10000]
    range: magma
    transform: log
  
```

:::


:::chunk

Articles also have lengths of various sorts. Some areas have substantially smaller abstracts than others.

```api
point_size: 3
encoding:
  foreground: null
  filter: null
  color:
    field: words
    domain: [0, 500]
    range: magma
    transform: sqrt
```
:::


:::chunk

Title lengths, too, cluster by topical area.

```api
point_size: 3
alpha: 80
encoding:
  foreground: null
  filter: null
  jitter_radius: null
  x: 
    field: x
    transform: literal
  y:
    field: y
    transform: literal
  color:
    field: title_length
    domain: [0, 200]
    range: magma
    transform: linear
  
```
:::

:::chunk

In most of these fields, the temporal division is extremely strong: science progresses within immunology and virology in such a way that recent articles have abstracts much more similar to each other than to articles from the 1970s and 1980s in the same fields.

```api
point_size: 1.2
alpha: 40

zoom:
  bbox: {"x":[-114.44657259301789,-35.94570776773757],"y":[-58.83688556079831,9.067210254589938]}
encoding:
  filter: null
  x: 
    field: x
    transform: literal
  y:
    field: y
    transform: literal
  color:
    field: year
    domain: [1975, 2025]
    range: viridis
  jitter_radius: null

```

:::


:::{.chunk #covid-19}

## COVID-19

But one area contains only papers from 2020-21. This is the 
COVID-19 island.

We considered a paper Covid-related if it contained at least one of the
following terms in its abstract: 'covid-19', 'COVID-19', 'Covid-19',
'CoViD-19', '2019-nCoV', 'SARS-CoV-2', 'coronavirus disease 2019',
'Coronavirus disease 2019'. Our dataset includes 132,802 Covid-related
papers.

The COVID cluster is 

```api
duration: 4000
alpha: 80
encoding:
  filter: null
  x:
    field: x
    transform: literal
  y:
    field: y
    transform: literal
  color:
    field: year
    domain: [1975, 2022]
    range: viridis
zoom:
  bbox: {"x":[-26.113317446654943,16.705487505186465],"y":[47.62328228197863,84.66201097142243]}
```

:::

:::chunk

We then group the Covid papers based on the presence of keywords in 
their title. Papers were assigned a label if their title contained that
term, either capitalized or not. Paper titles containing more than one
term were assigned randomly to one of them. This resulted in 35,874
labeled Covid-related papers: 27.0% from the total amount of
Covid-related papers and 45.6% of the Covid-related papers from the main
Covid cluster in the embedding.

```buttonset
label: Filter to title keyword.
target: "encoding.foreground.lambda"
mouseover: true
clone:
  - "encoding.foreground.lambda"
api:
  background_options:
    opacity: [.05, 2]
    size: [.1, 2]
  duration: 450
  alpha: 100
  encoding:
    filter: null
    color: null
    filter:
      field: covid_label
      lambda: d => d !== 'unlabeled'
    foreground:
      field: covid_label
      lambda: d => d !== 'Covid unlabeled'
pattern: 'd => d == "${value}"'
values: ["Antibody", "Anxiety", "Cancer", "Children", "Clinical", "Epidemic", "Healthcare", "Immune", "Implications", "Mental", "Mortality", "Outbreak", "Pediatric", "Pneumonia", "Population", "Psychological", "Respiratory", "Social", "Strategies", "Students","Surgery", "Symptoms", "Therapy", "Transmission", "Treatment", "Vaccine", "Workers"]
```

:::

:::chunk

Within this cluster appear all different types of articles in microcosm, from treatment and epidemiology to social and family related issues at the bottom. Vaccines appear as two major regions
completely distinct: one involving the scientific effort to create and test vaccines, and the other (towards the bottom) involving the public health effort to get people to use the vaccines once they were widely available.

The Covid cluster is among the most regions in the map.

```api
labels:
  url: "https://static.nomic.ai/tiles/pubmed/covid_label.geojson"
  name: covid_label
  label_field: covid_label
  size_field: undefined
encoding:
  filter:
    field: covid_label
    lambda: d => d !== ''
  foreground:
    field: covid_label
    lambda: |
      d => d !== 'Covid unlabeled'
  color:
    field: covid_label
    domain: ["Covid unlabeled", "Antibody", "Anxiety", "Cancer", "Children", "Clinical", "Epidemic", "Healthcare", "Immune", "Implications", "Mental", "Mortality", "Outbreak", "Pediatric", "Pneumonia", "Population", "Psychological", "Respiratory", "Social", "Strategies", "Students","Surgery", "Symptoms", "Therapy", "Transmission", "Treatment", "Vaccine", "Workers"]
    range: ["lightgrey", "#B79762", "#009271", "#004D43", "#5B4534", "#E83000", "#008941", "#549E79", "black", "#6F0062", "#006FA6", "#b65141", "#A4E804", "#8FB0FF", "#6B002C", "#3B5DFF", "#1CE6FF", "#FF9408", "#BA0900", "#1B4400", "#D790FF", "#0089A3", "#4FC601", "#00FECF", "#5A0007", "#00C2A0", "#FFB500", "#BC23FF", "#7A4900", "#CC0744", "#C20078", "#0000A6", "#aeaa00", "#FF2F80", "#FF34FF", "#FF4A46", "#FF90C9", "#6508ba", "#C895C5"]

```

:::

:::chunk

At a much smaller temporal dimension, we can see the differences in COVID papers in the 2020-2021 period.



```api

encoding:
  filter: null
  foreground: null
  color:
    field: date
    domain: [1572566400000, 1654041600000]
    range: viridis
```


:::legend
:::

:::

:::chunk


```api
encoding:
  filter:
    field: date
    op: within
    a: 10000000000000
    b: 1572566400000

```

```slider
clone:
  - encoding.filter
min: 1572566400000
max: 1654041600000
step: 100000000000
label: date
target: "encoding.filter.b"
```


:::

:::chunk

## Gender

By parsing out author names (especially for after 2000) we can get a sense
of which areas of publication have more male or female authors.

```api
duration: 1000
point_size: 1.4
encoding:
  filter:
  foreground: null
  color:
    field: GenderFirstAuthor
    domain: ['unknown', 'male', 'female']
    range: ["#f5f5f5", "#1f77b4", "#ff7f0e", ]

```

```button
label: Women
api: 
  background_options:
    opacity: [.05, 2]
    size: [.1, 1]
  encoding:
    foreground:
      field: GenderFirstAuthor
      lambda: "d => d === 'female'"
```

```button
label: Men
api: 
  color:
    field: GenderFirstAuthor
    domain: ['male', 'female', 'unknown']
    range: ["#1fc3aa", "#8624f5", "#f5f5f5"]
  background_options:
      opacity: [.05, 2]
      size: [.1, 1]
  encoding:
    foreground:
      field: GenderFirstAuthor
      lambda: "d => d === 'male'"
```

```button
label: Both
api: 
  color:
    field: GenderFirstAuthor
    domain: ['male', 'female', 'unknown']
    range: ["#1fc3aa", "#8624f5", "#f5f5f5"]
  background_options:
      opacity: [.05, 2]
      size: [.1, 1]
  encoding:
    foreground:
      field: GenderFirstAuthor
      lambda: "d => d !== 'unknown'"
```

:::

:::chunk

A few areas are dominated by female first authors. Unsurprisingly, midwifery 

```button
label: breastfeeding
api: {"zoom": {"bbox": {"x": [82.0, 84.0], "y": [130.0, 132.0]}}}
```


    

```button
label: midwifery
api: {"zoom": {"bbox": {"x": [80.0, 82.0], "y": [128.0, 130.0]}}}
```


  


    

```button
label: Prenatal testing
api: {"zoom": {"bbox": {"x": [84.0, 86.0], "y": [128.0, 130.0]}}}
```


    

```button
label: 6
api: {"zoom": {"bbox": {"x": [82.0, 84.0], "y": [128.0, 130.0]}}}
```


    

```button
label: Adolescent social health
api: {"zoom": {"bbox": {"x": [60.0, 62.0], "y": [146.0, 148.0]}}}
```


    

```button
label: Community engagement
api: {"zoom": {"bbox": {"x": [88.0, 90.0], "y": [182.0, 184.0]}}}
```


:::

:::chunk

Male issue:

```button
label: Shoulder Arthoscopy
api: {"zoom": {"bbox": {"x": [200.0, 202.0], "y": [46.0, 48.0]}}}
```


    

```button
label: Hip arthoplasty
api: {"zoom": {"bbox": {"x": [194.0, 196.0], "y": [78.0, 80.0]}}}
```


    

```button
label: Knee arthoplasty
api: {"zoom": {"bbox": {"x": [184.0, 186.0], "y": [78.0, 80.0]}}}
```


    

```button
label: Spine conditions
api: {"zoom": {"bbox": {"x": [162.0, 164.0], "y": [48.0, 50.0]}}}
```


    


    

```button
label: Heart surgery
api: {"zoom": {"bbox": {"x": [198.0, 200.0], "y": [-60.0, -58.0]}}}
```


    

```button
label: 7
api: {"zoom": {"bbox": {"x": [164.0, 166.0], "y": [46.0, 48.0]}}}
```


    

```button
label: 8
api: {"zoom": {"bbox": {"x": [196.0, 198.0], "y": [78.0, 80.0]}}}
```


    

```button
label: 9
api: {"zoom": {"bbox": {"x": [196.0, 198.0], "y": [54.0, 56.0]}}}
```


    

```button
label: 10
api: {"zoom": {"bbox": {"x": [160.0, 162.0], "y": [46.0, 48.0]}}}
```


    

```button
label: 11
api: {"zoom": {"bbox": {"x": [200.0, 202.0], "y": [-74.0, -72.0]}}}
```


    

```button
label: 12
api: {"zoom": {"bbox": {"x": [198.0, 200.0], "y": [44.0, 46.0]}}}
```


    

```button
label: 13
api: {"zoom": {"bbox": {"x": [176.0, 178.0], "y": [76.0, 78.0]}}}
```


    

```button
label: 14
api: {"zoom": {"bbox": {"x": [188.0, 190.0], "y": [72.0, 74.0]}}}
```


    

```button
label: 15
api: {"zoom": {"bbox": {"x": [188.0, 190.0], "y": [48.0, 50.0]}}}
```


    

```button
label: 16
api: {"zoom": {"bbox": {"x": [214.0, 216.0], "y": [8.0, 10.0]}}}
```


    

```button
label: 17
api: {"zoom": {"bbox": {"x": [200.0, 202.0], "y": [60.0, 62.0]}}}
```



:::


:::chunk

```api
encoding:
  filter:
    field: year
    op: within
    a: 3
    b: 2019

```

```slider
clone:
  - encoding.filter
min: 2001
max: 2020
step: 1
label: Year
target: "encoding.filter.b"
```

:::

:::chunk

While we prepopulate a few fields to color by, you can search for _any
regular expression_ across 20 million points. Enter any regular expression
into the searchbox below to filter based on titles.


```api
labels:
  url: null
```

```search
endpoint: "https://movies.benschmidt.org/project/search_regex"
field: "title"
```

:::

:::chunk

But clustering based on journal articles is

For example, here are articles about virology...

```api
encoding:
  filter: null
zoom:
  bbox: {"x":[-96.05127079631455,-59.63183562059765],"y":[-57.043643810838745,-25.54043908540754]}
labels:
  url: "https://static.nomic.ai/tiles/pubmed/labels.geojson"
  name: labels
  label_field: labels
  size_field: undefined
```

:::

:::chunk

And just below are a constellation of articles about the related field of immunology.

```api
zoom:
  bbox: {"x":[-82.05020739813041,-60.42508126020219],"y":[-29.027217800039722,-10.321250158052152]}
```

:::

:::chunk

## Neuroscience

Other fields occupy spots all over the map. Neuroscience congeals into two larger regions.

```api
labels:
  url: "https://static.nomic.ai/tiles/pubmed/neuroscience_label.geojson"
  name: neuroscience_label
  label_field: neuroscience_label
  size_field: undefined
encoding:
  foreground:
    field: neuroscience_label
    lambda: |
      d => d !== 'unlabeled' && d !== '' && d !== "Neuroscience unlabeled"
  color:
    field: neuroscience_label
    range: dark2
zoom:
  bbox:
    {"x":[-498.47709386009717,515.5673050798857],"y":[-263.16976179251145,235.80446625732142]}
```

:::


::::
