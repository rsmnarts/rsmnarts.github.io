import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import FacebookProvider, { Comments } from "react-facebook";

import config from "../../../content/meta/config";

const styles = theme => ({
  postComments: {
    margin: "3em 0 0",
    padding: "3em 0 0",
    borderTop: "1px solid #ddd"
  }
});

const PostComments = props => {
  const { classes, slug, facebook } = props;

  return (
    <div id="post-comments" className={classes.postComments}>
      <FacebookProvider appId={facebook}>
        <Comments
          href={`${config.siteUrl}${slug}`}
          width="100%"
          colorScheme="light"
        />
      </FacebookProvider>
    </div>
  );
};

PostComments.propTypes = {
  classes: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
  facebook: PropTypes.object.isRequired
};

export default withStyles(styles)(PostComments);
