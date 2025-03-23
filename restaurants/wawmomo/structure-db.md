# Web Plateforme

## website

#### home page
    - sign up / sign in
    - collections
    - about
    - contact
    - chat

#### profil page
    - achat dns (templates de base)
    - achat templates si superieur à l'achat de base

## DB

#### global auth
    - _id
    - first_name
    - last_name
    - email
    - password

#### global domaine_name
    - _id
    - _fk_auth_id
    - domaine_name  // monsite.com
    - model         // model 85
    - price

### DB Model 85

#### table colors
    - _id
    - _domaine_name_id
    - color_bgd_primary
    - color_bgd_secondary

#### table texts
    - _id
    - _domaine_name_id
    - text_1
    - text_2

#### table links
    - _id
    - _domaine_name_id
    - link_1
    - link_2
