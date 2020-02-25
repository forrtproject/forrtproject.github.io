---
# Display name
name: "{{ replace .Name "-" " " | title }}"

# Username (this should match the folder name and the name on publications)
authors:
- Name "{{ replace .Name "-" " " | title }}"

# Is this the primary user of the site?
superuser: false

# Role/position (e.g., Professor of Artificial Intelligence)
role:

# Organizations/Affiliations
organizations:
- name: 
  url: ""

# Short bio (displayed in user profile at end of posts)
bio: 

# List each interest with a dash
interests:
- Interest 1
- Interest 2

education:
  courses:
  - course: Title course 1
    institution: Name of Institution
    year: 2012
  - course: Title course 1
    institution: Name of Institution
    year: 2012

# Social/Academic Networking
# For available icons, see: https://sourcethemes.com/academic/docs/page-builder/#icons
#   For an email link, use "fas" icon pack, "envelope" icon, and a link in the
#   form "mailto:your-email@example.com" or "#contact" for contact widget.
social:
- icon: twitter
  icon_pack: fab
  link: https://twitter.com/USERNAME
- icon: google-scholar
  icon_pack: ai
  link: https://scholar.google.com/citations?user=PERSONID
- icon: orcid
  icon_pack: ai
  link: https://orcid.org/PERSONID
- icon: publons
  icon_pack: ai
  link: https://publons.com/researcher/1551653/USERNAME
- icon: osf
  icon_pack: ai
  link: https://osf.io/PERSONID
- icon: github
  icon_pack: fab
  link: https://github.com/USERNAME
- icon: envelope # comment the three lines to disable email.
  icon_pack: fas
  link: 'mailto:EMAILTOBEUSED' 
  
# Link to a PDF of your resume/CV from the About widget.
# To enable, copy your resume/CV to `static/files/cv.pdf` and uncomment the lines below.
# - icon: cv
#   icon_pack: ai
#   link: files/cv.pdf

# Enter email to display Gravatar (if Gravatar enabled in Config)
email: ""

# Organizational groups that you belong to (for People widget)
#   Set this to `[]` or comment out if you are not using People widget.
user_groups:
  - Contributors
---
