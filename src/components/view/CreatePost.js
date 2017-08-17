import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import sha1 from 'sha1';
import {APIManager} from '../../utils';

class CreatePost extends Component {

  constructor(){
    super()
    this.state = {
      post: {
        image: '',
        caption: ''
      }
    }
  }

  updatePost(event) {
    event.preventDefault();

    let updated = Object.assign({}, this.state.post);
    updated[event.target.id] = event.target.value;

    this.setState({
      post: updated
    });
  }


  submitPost(){
    //console.log('SubmitPost: ' + JSON.stringify(this.state.post));

    if (this.state.post.image.length === 0) {
      alert('Please add image first');
      return;
    }

    if (this.state.post.caption.length == 0) {
      alert('Please add caption first.');
      return;
    }

    let updated = Object.assign({}, this.state.post);
    this.props.onCreate(updated);
  }

  imageSelected(files){
    const image = files[0];
    console.log(image);

    const cloudName = 'dy6xduf53';
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const timestamp = Date.now()/1000;
    const uploadPreset = 'gxaofwpa';

    const paramsStr = `timestamp=${timestamp}&upload_preset=${uploadPreset}jW3jBNd6b_plOkyDo85R9F0Y0cE`;

    const signature = sha1(paramsStr);

    const params = {
      'api_key': '143523362544437',
      'timestamp': timestamp,
      'upload_preset': uploadPreset,
      'signature': signature
    }

    APIManager.uploadFile(url, image, params)
      .then((uploaded) => {
        console.log('Upload Complete: ' + JSON.stringify(uploaded));
        let updated = Object.assign({}, this.state.post);
        updated['image'] = uploaded['secure_url'];
        this.setState({
          post: updated
        });

        /**
{"public_id":"sajnsf7yfwhge4x2m8ry","version":1502420651,"signature":"c81a56fc5eef2ab76b430666b9e372f6a85f88ed","width":300,"height":338,"format":"jpg","resource_type":"image","created_at":"2017-08-11T03:04:11Z","tags":[],"bytes":25413,"type":"upload","etag":"b07f60f62ea54873521fac8125891a29","url":"http://res.cloudinary.com/dy6xduf53/image/upload/v1502420651/sajnsf7yfwhge4x2m8ry.jpg","secure_url":"https://res.cloudinary.com/dy6xduf53/image/upload/v1502420651/sajnsf7yfwhge4x2m8ry.jpg","original_filename":"hamster007"}
        **/

      })
      .catch((err) => {
        alert(err);
        return;
      })


  }

  render() {
    return (
      <div style={{background: '#fff'}}>
        <h2>CreatePost</h2>
        <input  id='caption' onChange={this.updatePost.bind(this)} type='text' placeholder="Caption" />
        <div className='row' style={{textAlign: 'right', marginTop: 20}}>
          <div className='3u 12u$(small)' >
            <Dropzone onDrop={this.imageSelected.bind(this)} style={{border: 'none'}}>
              <button className='button special small'>Upload Image</button>
            </Dropzone>
          </div>
          <div className='3u 12u$(small)' style={{marginLeft: 20}}>
            <button  className='button special small' onClick={this.submitPost.bind(this)}>Submit</button>
          </div>
          <div className="6u 12u$(small)">
						<img style={{width:120, float:'right', marginTop:12}} src={this.state.post.image} />
					</div>
        </div>
        <br /><br />
        <hr />
      </div>
    )
  }
}

export default CreatePost;
