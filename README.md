# MERNs Adventure

## Overview

This project is currently in development. This application will be presented as part of MongoDB Live 2021.

## Attributions

- Artwork was created by [Sarah Bogosh](https://sarahjbogosh.wixsite.com/badponies)
  - Rights to these work are separate from this repository. Please contact Sarah Bogosh for use of artwork.
  - Check out [Sarah's Instagram](https://www.instagram.com/badponies.illustration/?hl=en) for more rad works of art.
- Based app created with [Create React App](https://github.com/facebook/create-react-app).
- Some icons sourced from Font Awesome. [Like to license for use](https://fontawesome.com/license).

## Resources

### MongoDB

- Realm Web Quick Start: https://docs.mongodb.com/realm/web/quickstart/
- Realm User Authentication Overview: https://docs.mongodb.com/realm/web/authenticate/#std-label-web-login-email-password
- Realm Email/Password Authentication: https://docs.mongodb.com/realm/authentication/email-password/
- Accessing MongoDB Data with Realm: https://docs.mongodb.com/realm/web/mongodb/

### Styling

- Adding Sass to an app generated with Create React App: https://scotch.io/starters/react/adding-sass-to-create-react-app-applications
  - _NOTE_: At the time of writing these notes, Sass is at version 6.0.0. Make sure to install version 5.0.0 with Create React App. It currently does not support 6.0.0
- Using CSS Modules with Create React App: https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/
- Locking in an aspect ration
  - This was my initial strategy for ensuring that the gameplay area the user plays in stays a fixed ratio height and width so no matter the screensize your view of the game isn't distorted. By using SVGs for the gameplay, I no longer have to worry about this. SVGs are great for holding an aspect ratio and ensuring sub-sections of the SVG remain in the same location relative to the rest of the image.
  - CSS-Tricks, Aspect Ratio Boxes: https://css-tricks.com/aspect-ratio-boxes/
  - Generate styling for specific aspect ratio with Ratio Buddy: https://ratiobuddy.com/

## SVGs

- Metadata for SVGs
  - [W3 SVG Metadata Explanation](https://www.w3.org/TR/SVG11/metadata.html#MetadataElement), which is very technical and lengthy.
  - This [Dublin Core Generator](https://nsteffel.github.io/dublin_core_generator/generator_nq.html) helps you create metadata that follows Dublin Core, which is one of several formats for metadata.
  - Hoping to find better resources explaining metadata in a less technical and more friendly way.
