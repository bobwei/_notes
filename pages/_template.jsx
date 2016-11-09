import React from 'react';
import { Link } from 'react-router';
import { Container, Grid, Span } from 'react-responsive-grid';
import { prefixLink } from 'gatsby-helpers';
import includes from 'underscore.string/include';
import { colors, activeColors, navBarColor } from 'utils/colors';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

import typography from 'utils/typography';
import { config } from 'config';

import MainPage from 'components/MainPage';

import 'css/main.scss';
import 'css/github.css';
import themeStyles from 'css/theme.module.scss';
if (canUseDOM) {
  // Enable :active styles to work on mobile Safari
  document.addEventListener('touchstart', () => {}, true);
}

const { rhythm, adjustFontSizeTo } = typography;

module.exports = React.createClass({
  propTypes () {
    return {
      children: React.PropTypes.object,
    }
  },
  render () {
    const { location: { pathname } } = this.props;
    const notesActive = includes(pathname, prefixLink('/notes/'));

    return (
      <div>
        <div
          className={themeStyles.navBarBgColor}
          style={{
            color: colors.fg,
            marginBottom: rhythm(1.5),
          }}
        >
          <Container
            style={{
              maxWidth: 960,
              paddingLeft: rhythm(3/4),
            }}
          >
            <Grid
              columns={12}
              style={{
                padding: `${rhythm(3/4)} 0`,
              }}
            >
              <Span
                columns={4}
                style={{
                  height: 24, // Ugly hack. How better to constrain height of div?
                }}
              >
                <Link
                  to={prefixLink('/')}
                  style={{
                    textDecoration: 'none',
                    color: navBarColor,
                    fontSize: adjustFontSizeTo('25.5px').fontSize,
                  }}
                >
                  {config.siteTitle}
                </Link>
              </Span>
              <Span columns={8} last>
                <Link
                  to={prefixLink(config.notePages[0])}
                  style={{
                    background: notesActive ? activeColors.bg : 'transparent',
                    color: navBarColor,
                    float: 'right',
                    textDecoration: 'none',
                    paddingLeft: rhythm(1/2),
                    paddingRight: rhythm(1/2),
                    paddingBottom: rhythm(3/4),
                    marginBottom: rhythm(-1),
                    paddingTop: rhythm(1),
                    marginTop: rhythm(-1),
                  }}
                >
                  Notes
                </Link>
              </Span>
            </Grid>
          </Container>
        </div>
        <Container
          style={{
            maxWidth: 960,
            padding: `${rhythm(1)} ${rhythm(3/4)}`,
            paddingTop: 0,
          }}
        >
          {pathname === prefixLink('/') &&
            <MainPage />
          }
          {pathname !== prefixLink('/') &&
            this.props.children
          }
        </Container>
      </div>
    )
  },
})
