import mongoose from "mongoose";
const Schema = mongoose.Schema;

const eagerSchema = new Schema({
  status: String,
  batch_id: String,
  url: String,
  secure_url: String
});

const assetSchema = new Schema({
    public_id: {
        type: String,
        required: true
    },
     asset_id: {
        type: String,
        required: true
    },
      secure_url: {
        type: String,
        required: true
    },
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    width: {
        type: Number
    },
    height: {
        type: Number
    },
    format: {
        type: String
    },
    resource_type: {
        type: String
    },
    type: {
        type: String
    },
     bytes: {
        type: Number
    },
    folder: {
        type: String
    },
    eager: [eagerSchema]
})

export default mongoose.model('Asset', assetSchema)

// {
//   asset_id: 'c37d76bf17b2df2a6e7a786fa07db84f',
//   public_id: 'nodejs-projects/ehq7o3gy1c6cgt3cnptd',
//   version: 1767380834,
//   version_id: '07bf8c6277e0aaa0dff6390ac060627f',
//   signature: '8b53400d65b902be3bd956829bbcf12b80d77bbe',
//   width: 4912,
//   height: 6140,
//   format: 'jpg',
//   resource_type: 'image',
//   created_at: '2026-01-02T19:07:14Z',
//   tags: [],
//   bytes: 7296463,
//   type: 'upload',
//   etag: 'fa9a7fe474ec65c650db2e8ca2aac34e',
//   placeholder: false,
//   url: 'http://res.cloudinary.com/dvxxeyzef/image/upload/v1767380834/nodejs-projects/ehq7o3gy1c6cgt3cnptd.jpg',
//   secure_url: 'https://res.cloudinary.com/dvxxeyzef/image/upload/v1767380834/nodejs-projects/ehq7o3gy1c6cgt3cnptd.jpg',
//   folder: 'nodejs-projects',
//   original_filename: 'file',
//   api_key: '245618362341152'
// }