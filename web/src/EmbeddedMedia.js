import React, { Component } from "react";
import service from "./model-service";
import "./EmbeddedMedia.css";

class EmbeddedMedia extends Component {
  state = {
    source: null,
    visible: false
  };

  componentDidMount() {
    if (this.props.targetUrl) {
      this.getMedia(this.props.targetUrl);
    }
  }

  getMedia = url => {
    var ogData = service.getOGData(url);
    ogData.then(this.handleResults).catch(this.handleError);
  };

  handleResults = results => {
    this.setState({
      source: results.data,
      visible: true
    });
  };

  handleError = error => {
    this.setState({
      source: null,
      visible: false
    });
  };

  getHref = () => {
    if (this.state.source.ogUrl) return this.state.source.ogUrl;
  };

  renderMedia = () => {
    return this.state.source.ogVideo ? this.renderVideo() : this.renderImage();
  };

  renderImage = () => {
    return (
      <img
        src={this.state.source.ogImage.url}
        alt={this.state.source.ogTitle}
        longdesc={this.state.source.ogDescription}
      />
    );
  };

  renderVideo = () => {
    return (
      <iframe
        src={this.state.source.ogVideo.url}
        width={this.state.source.ogVideo.width}
        height={this.state.source.ogVideo.height}
      />
    );
  };

  render() {
    return this.state.visible
      ? <a href={this.getHref()} target="_blank" className="embedded-image">
          {this.renderMedia()}
        </a>
      : null;
  }
}

export default EmbeddedMedia;