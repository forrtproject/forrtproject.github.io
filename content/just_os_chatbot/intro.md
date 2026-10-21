+++
widget = "blank"
headless = true
active = true
weight = 5

title = "JUST-OS Chatbot"
subtitle = ""

[design]
  columns = "1"

[design.background]
  text_color_light = false

[design.spacing]
  padding = ["60px", "0", "60px", "0"]

[advanced]
 css_style = "font-size: 1.25rem;"
 css_class = ""
+++

The **JUST-OS** (Judicious User-friendly Support Tool for Open Science) chatbot is an initiative by researchers at the University of Groningen and [FORRT](https://forrt.org/) that aims to develop an AI-based chatbot to help researchers navigate Open Science resources more easily.

Researchers generally support Open Science practices but often struggle navigating the vast landscape of available resources. JUST-OS aims to provide user-friendly, tailored, and efficient guidance to help researchers find relevant Open Science resources.

<br>

{{< just_os_chat >}}

<br>

Try the JUST-OS Chatbot. For any issues or suggestions, please submit feedback by opening an issue on GitHub [click here](https://github.com/forrtproject/forrtproject.github.io/issues).

### Acknowledgements

JUST-OS writes its answers with [OpenScholar](https://huggingface.co/OpenSciLM/Llama-3.1_OpenScholar-8B) (Llama-3.1_OpenScholar-8B), an open language model built to synthesise the scientific literature with citations. OpenScholar was developed by Akari Asai and colleagues at the University of Washington and the Allen Institute for AI (Ai2). We thank them for releasing the model and its code openly. To learn more about how OpenScholar works, read [the paper in *Nature*](https://doi.org/10.1038/s41586-025-10072-4).


--- 

{{< just_os_team >}}
