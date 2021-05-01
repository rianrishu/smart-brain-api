const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '14387d3c2ff44db5b2d2f67add6cd697'
  });

  const handleApiCall = (req,res) => {
    //   console.log(req.body.input);
      app.models
      .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
      .then(r => res.json(r))
      .catch(err => res.status(400).json(err))
  }

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id','=',id)
    .increment('entires', 1)
    .returning('entires')
    .then(entires => {
        res.json(entires[0]);
            })
    .catch(err=> res.status(400).json('unable to get entries'))
};


module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}