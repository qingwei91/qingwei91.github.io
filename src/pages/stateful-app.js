import React from 'react';
import {Deck, MarkdownSlides} from 'spectacle';

import slides from 'raw-loader!./stateful-app/slides.md'

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck>
        {MarkdownSlides(slides)}
      </Deck>
    );
  }
}
