---
title: The landscape of biomedical research
---

:::{.scrollership scroller-type="deepscatter"}

:::chunk

## The landscape of biomedical research

This interactive visualization displays 21 million scientific papers collected in the [PubMed database](https://pubmed.ncbi.nlm.nih.gov), maintained by the United States National Library of Medicine and encompassing all biomedical and life science fields of research.

You can scroll the narration in the left part of the screen, and interact with the visualization in the right part of the screen. Zooming in loads additional papers. Information about each individual paper appears on mouse-over, and clicking on a paper opens its PubMed page in a separate window. Search over titles is available in the upper-right corner.

Scroll down to read more!

And see [our paper](https://www.biorxiv.org/content/10.1101/xxx) for more details.

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

:::

:::chunk

Here we offer an approach that enables all of the above: a
global two-dimensional atlas of the biomedical and life science
literature which is based on the abstracts of all 21 million English
language articles contained in the PubMed database. To create the map,
we embedded the abstracts into two dimensions using the
transformer-based large language model [PubMedBERT](https://dl.acm.org/doi/10.1145/3458754) combined
with the neighbor embedding method [t-SNE](https://www.jmlr.org/papers/v9/vandermaaten08a.html).

Our map is based on the abstract texts alone, and did not use any
further metadata or information on citations or references.

:::

:::chunk

This visualization facilitates exploration of the
biomedical literature and can reveal aspects of the data that would not
be easily noticed with other analysis methods. We showcase the power of
our approach in four examples: 

1. [The emergence of the Covid-19 literature.](#covid-19)
2. [The evolution of different subfields of neuroscience](#neuroscience)
3. The uptake of machine learning (upcoming; see paper)
4. [The distribution of gender imbalance across biomedical fields.](#gender-bias)

The shared strategy in all of these is to formulate specific hypotheses
about the data based on the visual exploration, and then to confirm them by a dedicated statistical
analysis of the original high-dimensional dataset.

:::

:::chunk

We labeled the dataset by selecting 38 keywords contained in journal
titles that reflected the general topic of the paper. We based our
choice of keywords on lists of medical specialties and life science
branches that appeared frequently in the journal titles in our dataset.

Papers were assigned a label if their journal title contained that term. 
As a result, about a third of the papers in the dataset received labels.

The labels demonstrate that our map has sensible global organization:
_psychology_ papers are next to _psychiatry_ papers, _optics_ is next to 
_physics_, and so on. Overall, the left part of the map corresponds to life
sciences, while the right part corresponds to medicine.

```api
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
duration: 1000
background_options:
  opacity: [.2, 1]
  size: [.5, 1]
labels:
  url: "https://static.nomic.ai/tiles/pubmed/labels.geojson"
  name: labels
  label_field: labels
  size_field: undefined
```

```buttonset
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
    color: 
        field: labels
        range: ["lightgrey", "#B79762", "#009271", "#004D43", "#5B4534", "#E83000", "#008941", "#549E79", "black", "#6F0062", "#006FA6", "#b65141", "#A4E804", "#8FB0FF", "#6B002C", "#3B5DFF", "#1CE6FF", "#FF9408", "#BA0900", "#1B4400", "#D790FF", "#0089A3", "#4FC601", "#00FECF", "#5A0007", "#00C2A0", "#FFB500", "#BC23FF", "#7A4900", "#CC0744", "#C20078", "#0000A6", "#aeaa00", "#FF2F80", "#FF34FF", "#FF4A46", "#FF90C9", "#6508ba", "#C895C5"]
        "domain": ["unlabeled", "microbiology", "neurology", "pediatric", "pharmacology", "physiology", "chemistry", "education", "cancer", "virology", "surgery", "biochemistry", "ophthalmology", "immunology", "rehabilitation", "veterinary", "cardiology", "pathology", "psychiatry", "genetics", "dermatology", "environment", "nutrition", "radiology", "psychology", "engineering", "gynecology", "physics", "infectious", "anesthesiology", "computation", "material", "neuroscience", "nursing", "ecology", "bioinformatics", "healthcare", "ethics", "optics"]
    foreground:
      field: labels
      lambda: d => d !== 'unlabeled'
pattern: 'd => d == "${value}"'
values: ["unlabeled", "dermatology", "physiology", "genetics", "gynecology", "surgery", "neurology", "ophthalmology", "material", "radiology", "veterinary", "physics", "biochemistry", "cardiology", "nursing", "engineering", "chemistry", "psychiatry", "neuroscience", "virology", "environment", "cancer", "pediatric", "pathology", "nutrition", "microbiology", "education", "bioinformatics", "ecology", "rehabilitation", "optics", "immunology", "pharmacology", "psychology"]
```

:::


:::chunk

While we use journal titles to assign labels, the actual data underlying this representation are **abstract texts**.
Here we color the map by length of each abstract (darker color: shorter abstracts; lighter color: longer abstracts). This, too, shows regional patterns, with some disciplines preferring longer abstracts than others.

```api
point_size: 1.2
labels: null
encoding:
  foreground: null
  filter: null
  x:
    field: x
    transform: literal
  y: 
    field: y
    transform: literal
  color:
    field: abstract_length
    domain: [0, 500]
    range: magma
```
:::


:::chunk

Abstract lengths do not obey a smooth distribution: instead, they cluster at 150, 200, and 250 words,
likely because authors are constrained by journals' submission guidelines. 

```api
encoding:
  x: 
    field: abstract_length.x
    transform: literal
  y: 
    field: abstract_length.y
    transform: literal
  foreground: null
  color:
    field: abstract_length
    domain: [0, 500]
    range: magma
labels:
  name: abstract lengths
  labels:
    - {text: '200 words: 170,806 abstracts', x: -47.5837670871576, y: -154.5403565148235}
    - {text: '150 words: 148,349', x: -122.98567376541476, y: -118.22208002322414}
    - {text: '250 words: 147,021 abstracts', x: 1.1658502332687704, y: -83.1412289407424}
    - {text: '100 words: 75,265 abstracts', x: -145.88492702060688, y: 10.953296382699634}
```

:::

:::chunk

The majority of the displayed papers were published between 1970 and 2021. Here darker colors correspond to earlier publication years and lighter colors correspond to more recent papers.

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
labels:
  name: publication years
  labels:
    - {text: '2020: 1.41m', x: 241.5698747443659, y: -158.4085756806052}   
    - {text: '1975: 82k', x: -241.5698747443659, y: 100.4085756806052}   
```

:::

:::chunk

Our map, however, is not predominantly organized by time. Most regions contain articles from multiple different 
eras in fairly close proximity.

```api
labels: null
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

But when zooming in closer, temporal periods often become well segregated. In most individual fields, the temporal division is very strong: for example, here we see that science progresses within immunology and virology in such a way that recent articles have abstracts much more similar to each other than to articles from the 1970s and 1980s in the same fields.

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

Strikingly, one area of the map contains only papers from 2020&ndash;21. 
These are papers on Covid-19.

We considered a paper Covid-related if it contained phrases like "Covid-19" or "SARS-CoV-2"
in the abstract text. Our dataset includes 132 thousand Covid-related papers, most 
of which are concentrated in this area.

_See our paper for direct evidence that Covid literature formed an unprecedentally tight research cluster._

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

We can group the Covid papers based on the presence of specific keywords in 
their title. All different kinds of Covid-related research appear in this cluster in microcosm, from treatment and epidemiology at the top, to social and family-related issues at the bottom. 

Vaccines appear as two major regions which are completely distinct: one involving the scientific effort to create and test vaccines, and the other (towards the bottom) involving the public health effort to get people to use the vaccines once they were widely available.

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


```buttonset
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
    filter:
      field: covid_label
      lambda: |
        d => d !== ''
    foreground:
      field: covid_label
      lambda: |
        d => d !== 'Covid unlabeled'
pattern: 'd => d == "${value}"'

values: ["Antibody", "Anxiety", "Cancer", "Children", "Clinical", "Epidemic", "Healthcare", "Immune", "Implications", "Mental", "Mortality", "Outbreak", "Pediatric", "Pneumonia", "Population", "Psychological", "Respiratory", "Social", "Strategies", "Students","Surgery", "Symptoms", "Therapy", "Transmission", "Treatment", "Vaccine", "Workers"]

```

```button
label: clear
api:
  encoding:
    filter2: null
    filter:
      field: covid_label
      lambda: |
        d => d !== ''
    foreground: 
      field: covid_label
      lambda: |
        d => d !== 'Covid unlabeled'
```

:::

:::chunk

We can also see how the focus of Covid publications shifted with time during 2020–2021. Early papers are predominantly clinical, while research on societal implications and vaccine hesitancy appeared later.

```api
zoom:
  bbox: {"x":[-26.113317446654943,16.705487505186465],"y":[47.62328228197863,84.66201097142243]}
encoding:
  filter: 
      field: covid_label
      lambda: |
        d => d !== ''
  filter2:
    field: date
    op: between
    a: 1572566400000
    b: 1682566400000
  foreground: null
  color:
    field: date
    domain: [1572566400000, 1654041600000]
    range: viridis
duration: 2000
```

```double-slider
api:
  duration: 1
clone:
  - encoding.filter2
min: 1572566400000
max: 1654041600000
step: 100
target_min: "encoding.filter2.a"
target_max: "encoding.filter2.b"
label: date
```

:::


:::chunk

## Neuroscience

Neuroscience papers congeal into two large regions of the map: one in the upper part, and one in the lower part.

```api
max_points: 1_000_000
zoom_balance: .38
point_size: 3
labels: null
alpha: 275
zoom_align: right
duration: 2000
background_options:
  opacity: [.05, 2]
  size: [.1, 1.2]
zoom:
  bbox:
    x: [-250, 250]
    y: [-250, 250]
encoding:
  filter:
    field: labels
    lambda: d => d == 'neuroscience'
  color:
    field: labels
    range: ["lightgrey", "#B79762", "#009271", "#004D43", "#5B4534", "#E83000", "#008941", "#549E79", "black", "#6F0062", "#006FA6", "#b65141", "#A4E804", "#8FB0FF", "#6B002C", "#3B5DFF", "#1CE6FF", "#FF9408", "#BA0900", "#1B4400", "#D790FF", "#0089A3", "#4FC601", "#00FECF", "#5A0007", "#00C2A0", "#FFB500", "#BC23FF", "#7A4900", "#CC0744", "#C20078", "#0000A6", "#aeaa00", "#FF2F80", "#FF34FF", "#FF4A46", "#FF90C9", "#6508ba", "#C895C5"]
    "domain": ["unlabeled", "microbiology", "neurology", "pediatric", "pharmacology", "physiology", "chemistry", "education", "cancer", "virology", "surgery", "biochemistry", "ophthalmology", "immunology", "rehabilitation", "veterinary", "cardiology", "pathology", "psychiatry", "genetics", "dermatology", "environment", "nutrition", "radiology", "psychology", "engineering", "gynecology", "physics", "infectious", "anesthesiology", "computation", "material", "neuroscience", "nursing", "ecology", "bioinformatics", "healthcare", "ethics", "optics"]
```

:::

:::chunk

Coloring neuroscience papers by some of the prominent terms appearing in their titles, we see that the upper part encompasses research on cellular and molecular neuroscience, whereas the lower part contains literature on behavioural and computational neuroscience.  

```api
duration: 2000
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
```

:::

:::chunk

Coloring papers by publication year suggests that neuroscience originated as a study of cellular and molecular mechanisms, and later broadened to include behavioural and computational research. 

_See direct quantifications of this effect in our paper._

```api
encoding:
  filter2:
    field: year
    op: between
    a: 1970
    b: 2021
  color:
    field: year
    domain: [1970, 2021]
    range: viridis
```

```double-slider
clone:
  - encoding.filter2
min: 1970
max: 2021
step: 1
label: year
target_min: "encoding.filter2.a"
target_max: "encoding.filter2.b"
```

:::


:::chunk

## Gender bias

Using the first name of the first author of each paper, we could infer their gender. 
Coloring the map with the inferred gender, we can see
which research fields have more male or female authors.

```api
duration: 1000
point_size: 1.4
labels: null
zoom:
  bbox:
    x: [-250, 250]
    y: [-250, 250]
encoding:
  filter: null
  filter2: null
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

Some areas are dominated by either female or male first authors. Here are some examples:

```button
label: female-dominated area -- contraceptive use
api: {"zoom": {"bbox": {"x":[53.256,68.275],"y":[86.965,94.832]}}}
```

```button
label: male-dominated area -- shoulder arthoscopy
api: {"zoom": {"bbox": {"x": [200.0, 202.0], "y": [46.0, 48.0]}}}
```

:::

:::chunk

In some individual disciplines we saw substantial heterogeneity of gender ratios. For example, there were male- and female-dominated regions in the map of healthcare papers. One of the more male-dominated clusters focused on financial management while one of the more female ones -- on patient care.

```api
point_size: 2
alpha: 100
zoom:
  bbox: {"x":[45.0, 95.0],"y":[170.0, 210.0]}
encoding:
  filter: 
    field: labels
    lambda: d => d == 'healthcare'
  foreground:
    field: GenderFirstAuthor
    lambda: "d => d !== 'unknown'"
  x: 
    field: x
    transform: literal
  y:
    field: y
    transform: literal
  color:
    field: GenderFirstAuthor
    domain: ['male', 'female', 'unknown']
    range: ["#1f77b4", "#ff7f0e", "#f5f5f5"]
  jitter_radius: null
labels:
  name: healthcare
  labels: 
    - text: finances
      x: 71.05457651874438
      y: 198.39371158959952
    - text: patient care
      x: 68.47492000400109
      y: 179.31588838556968
```

:::

:::chunk

In education, female authors dominated research on nursing training whereas male authors were more frequent in research on medical training.

```api
point_size: 2
alpha: 100
zoom:
  bbox: {"x":[65.0, 135.0],"y":[150.0, 200.0]}
encoding:
  filter: 
    field: labels
    lambda: d => d == 'education'
  foreground:
    field: GenderFirstAuthor
    lambda: "d => d !== 'unknown'"
  x: 
    field: x
    transform: literal
  y:
    field: y
    transform: literal
  color:
    field: GenderFirstAuthor
    domain: ['male', 'female', 'unknown']
    range: ["#1f77b4", "#ff7f0e", "#f5f5f5"]
  jitter_radius: null
labels:
  name: education
  labels: 
    - text: nurse education
      x: 91.05457651874438
      y: 164
    - text: doctor education
      x: 119
      y: 169
```

:::

:::chunk

In surgery, only 24\% of the first authors were female, but this fraction increased to 61\% in the cluster of papers on veterinary surgery.

```api
point_size: 2
alpha: 100

zoom:
  bbox: {"x":[125.0, 175.0],"y":[-85.0, -45.0]}
encoding:
  filter: 
    field: labels
    lambda: d => d == 'surgery'
  foreground:
    field: GenderFirstAuthor
    lambda: "d => d !== 'unknown'"
  x: 
    field: x
    transform: literal
  y:
    field: y
    transform: literal
  color:
    field: GenderFirstAuthor
    domain: ['male', 'female', 'unknown']
    range: ["#1f77b4", "#ff7f0e", "#f5f5f5"]
  jitter_radius: null
labels:
  name: education
  labels: 
    - text: veterininary surgery
      x: 153
      y: -72
    - text: heart surgery
      x: 163
      y: -76  
```

:::


:::chunk

## BERT model vs. TF-IDF

We also produced a two-dimensional map based on the bag-of-words representation of PubMed abstracts (known in the natural language processing literature as TF-IDF) instead of the PubMedBERT model. This resulted in worse separation between our journal-based labels, so used the PubMedBERT approach for all the visualizations above. Please see the paper for more detailed comparison. 

Here you can switch between the PubMedBERT-based and the TF-IDF-based maps.

```api
point_size: 1.2
alpha: 45
labels: null
encoding:
  filter: null
  filter2: null
  x:
    field: tfidf.x
    transform: literal
  y:
    field: tfidf.y
    transform: literal
  foreground:
    field: labels
    lambda: d => d !== 'unlabeled'
  color:
    field: labels
    range: ["lightgrey", "#B79762", "#009271", "#004D43", "#5B4534", "#E83000", "#008941", "#549E79", "black", "#6F0062", "#006FA6", "#b65141", "#A4E804", "#8FB0FF", "#6B002C", "#3B5DFF", "#1CE6FF", "#FF9408", "#BA0900", "#1B4400", "#D790FF", "#0089A3", "#4FC601", "#00FECF", "#5A0007", "#00C2A0", "#FFB500", "#BC23FF", "#7A4900", "#CC0744", "#C20078", "#0000A6", "#aeaa00", "#FF2F80", "#FF34FF", "#FF4A46", "#FF90C9", "#6508ba", "#C895C5"]
    "domain": ["unlabeled", "microbiology", "neurology", "pediatric", "pharmacology", "physiology", "chemistry", "education", "cancer", "virology", "surgery", "biochemistry", "ophthalmology", "immunology", "rehabilitation", "veterinary", "cardiology", "pathology", "psychiatry", "genetics", "dermatology", "environment", "nutrition", "radiology", "psychology", "engineering", "gynecology", "physics", "infectious", "anesthesiology", "computation", "material", "neuroscience", "nursing", "ecology", "bioinformatics", "healthcare", "ethics", "optics"]
zoom:
  bbox:
    x: [-250, 250]
    y: [-250, 250]
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

:::


::::
