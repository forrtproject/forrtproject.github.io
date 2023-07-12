{
    "timestamp": "2020-06-05T19:09:54.895Z",
    "title": "A Software Tool for Removing Patient Identifying Information from Clinical Documents",
    "link_to_resource": "https://doi.org/10.1197/jamia.M2702",
    "creators": [
        "Friedlin",
        "F. J.",
        "& McDonald",
        "C. J."
    ],
    "material_type": [
        "Primary Source",
        "Reading",
        "Paper"
    ],
    "education_level": [
        "College / Upper Division (Undergraduates)"
    ],
    "abstract": "We created a software tool that accurately removes all patient identifying information from various kinds of clinical data documents, including laboratory and narrative reports. We created the Medical De-identification System (MeDS), a software tool that de-identifies clinical documents, and performed 2 evaluations. Our first evaluation used 2,400 Health Level Seven (HL7) messages from 10 different HL7 message producers. After modifying the software based on the results of this first evaluation, we performed a second evaluation using 7,190 pathology report HL7 messages. We compared the results of MeDS de-identification process to a gold standard of human review to find identifying strings. For both evaluations, we calculated the number of successful scrubs, missed identifiers, and over-scrubs committed by MeDS and evaluated the readability and interpretability of the scrubbed messages. We categorized all missed identifiers into 3 groups: (1) complete HIPAA-specified identifiers, (2) HIPAA-specified identifier fragments, (3) non-HIPAA\u2013specified identifiers (such as provider names and addresses). In the results of the first-pass evaluation, MeDS scrubbed 11,273 (99.06%) of the 11,380 HIPAA-specified identifiers and 38,095 (98.26%) of the 38,768 non-HIPAA\u2013specified identifiers. In our second evaluation (status postmodification to the software), MeDS scrubbed 79,993 (99.47%) of the 80,418 HIPAA-specified identifiers and 12,689 (96.93%) of the 13,091 non-HIPAA\u2013specified identifiers. Approximately 95% of scrubbed messages were both readable and interpretable. We conclude that MeDS successfully de-identified a wide range of medical documents from numerous sources and creates scrubbed reports that retain their interpretability, thereby maintaining their usefulness for research.",
    "language": [
        "English"
    ],
    "conditions_of_use": "I don't see any of these",
    "primary_user": [
        "Student"
    ],
    "subject_areas": [
        "Applied Science",
        "Social Science"
    ],
    "FORRT_clusters": [
        "Reproducible Analyses",
        "Open Data and Materials"
    ],
    "tags": [
        ""
    ]
}