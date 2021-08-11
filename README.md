# Understand AI - Coding

## Running the app
```bash
    npm install 
    npm start
```

## The appreach
I chose a react-redux-thunk combination because it offers the right flexibility and structure such that the code can be extended easiliy.

The idea was to keep things simple and provide a simple UI where the user can just most back and forth on a list of images (this can be random clips or frames from a video)

The list of tags and their types are all provided via a JSON data structure so it's easy to change the labels at anytime using one api call.

## Evolution

Becuase images in video can be more or less the same over a lot of frames (Assuming something like a 30 fps video) it would be nice to group the images by similarity using some neural net such that the user can select just one on each group of images and all the other similar frames would also carry the same lebel.

## What I would have liked to do

I din't have a lot of time on my hand. This should also enzyme tests on the UI and tests on the state functions to be sure the actions modify the state the way they are intended to.


