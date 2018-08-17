import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import LocalizedComponent
  from '@gctools-components/react-i18n-translation-webpack';
import {
  Nav,
  NavItem,
} from 'reactstrap';
import Subnav from './subnav';

const Sidenav = (props) => (

  <StaticQuery query={graphql`
        query{
          component:allMarkdownRemark(
            filter: {
              frontmatter: {path: {regex: "/\/component\//"}}
            },
            sort:{
              fields:[frontmatter___subnav]
            }
          ){
            totalCount
              edges{
                node {
                  frontmatter {
                    title
                    path
                    lang
                    subnav
                  }
                }
            }
          }
          overview:allMarkdownRemark(
            filter: 
              {frontmatter: {path: {regex: "/\/overview\//"}}
            },
            sort:{
              fields:[frontmatter___subnav]
            }
          ){
            totalCount
              edges{
                node {
                  frontmatter {
                    title
                    path
                    lang
                    subnav
                  }
                }
            }
          }
          content:allMarkdownRemark(
            filter: 
            {frontmatter: {path: {regex: "/\/content\//"}}
            },
            sort:{
              fields:[frontmatter___subnav]
            }
          ) {
            totalCount
              edges{
                node {
                  frontmatter {
                    title
                    path
                    lang
                    subnav
                  }
                }
            }
          }
          identity:allMarkdownRemark(
            filter: {
              frontmatter: {path: {regex: "/\/identity\//"}}
            },
            sort:{
              fields:[frontmatter___subnav]
            }
          ) {
            totalCount
              edges{
                node {
                  frontmatter {
                    title
                    path
                    lang
                    subnav
                  }
                }
            }
          }
          data:allMarkdownRemark(
            filter: {
              frontmatter: {path: {regex: "/\/data\//"}}
            },
            sort:{
              fields:[frontmatter___subnav]
            }
          ){
            totalCount
              edges{
                node {
                  frontmatter {
                    title
                    path
                    lang
                    subnav
                  }
                }
            }
          }
        }
    `}
    render={(data) => {

      let subNameEn = "";
      let subNameFr = "";
      let subGroup = [];
      let subPieces = [];
      data[props.path.split("/")[1]].edges.forEach((edges) => {
        if (edges.node.frontmatter.subnav.split("/")[1] !== subNameEn) {
          if (subNameEn !== "") {
            subPieces.push(
              <Subnav
                files={subGroup}
                nameEn={subNameEn}
                nameFr={subNameFr}
                path={props.path}
              />
            );
          }
          subGroup = [];
          subNameEn = edges.node.frontmatter.subnav.split("/")[1];
          subNameFr = edges.node.frontmatter.subnav.split("/")[2];
        }
        subGroup.push(edges);
      });
      if (subGroup.push.length !== 0) {
        subPieces.push(
          <Subnav
            files={subGroup}
            nameEn={subNameEn}
            nameFr={subNameFr}
            path={props.path}
          />
        );
      }
      return (
        <div>
          <Nav vertical>
            {/*  {
              data[props.path.split("/")[1]].edges.map((edges) => {
                if ((localizer.lang === "en_CA") && (edges.node.frontmatter.lang === "en"))
                  return (
                    <NavItem>
                      <Link to={edges.node.frontmatter.path} class="nav-link">
                        {edges.node.frontmatter.title}
                      </Link>
                    </NavItem>
                  );
                else
                  if ((localizer.lang === "fr_CA") && (edges.node.frontmatter.lang === "fr"))
                    return (
                      <NavItem>
                        <Link to={edges.node.frontmatter.path} class="nav-link">
                          {edges.node.frontmatter.title}
                        </Link>
                      </NavItem>);
              }
              )
            } */}
            {subPieces}
          </Nav>
        </div>
      )
    }}
  />
);

export default LocalizedComponent(Sidenav);

