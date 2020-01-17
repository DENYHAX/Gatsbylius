import React from "react";
import PropTypes from "prop-types";
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";
import { Container, Row, Col } from "styled-bootstrap-grid";
import { FiEye, FiShoppingCart } from "react-icons/fi";

import Layout from "../components/Layout";
import {
  GalleryItem,
  GalleryImageWrapper,
  Infos,
  ProductOverlay,
  ProductOverlayButton,
  ProductOverlayLink,
} from "../components/ProductGrid/styled";
import SEO from "../components/seo";

const pageTitle = "Gatsbylius Print Shop";

const IndexPage = ({ data }) => (
  <Layout pageTitle={pageTitle}>
    <SEO title={pageTitle} />
    <Container>
      <Row>
        <Col>
          <h2 id="our-products" style={{ paddingTop: "4rem" }}>
            Our products
          </h2>
        </Col>
      </Row>

      <Row>
        {data.allProduct.nodes.map(product => (
          <Col key={product.slug} sm={6} md={4}>
            <GalleryItem>
              <GalleryImageWrapper>
                <Img
                  sizes={{
                    ...product.localImage.childImageSharp.fluid,
                  }}
                  style={{ maxHeight: "100%" }}
                  imgStyle={{ objectFit: "contain" }}
                />
              </GalleryImageWrapper>

              <ProductOverlay>
                <em>{product.name}</em>
                <ProductOverlayButton type="button">
                  <span>Add to cart</span>
                  <FiShoppingCart size="1.2em" />
                </ProductOverlayButton>
                <ProductOverlayLink to={`/product/${product.slug}`}>
                  <span>Details</span>
                  <FiEye size="1.2em" />
                </ProductOverlayLink>
              </ProductOverlay>
            </GalleryItem>
          </Col>
        ))}
      </Row>

      <Row>
        <Col>
          <h2>Our categories</h2>
        </Col>
      </Row>

      <Row>
        {data.allCategory.nodes.map(category => {
          const fluidCategoryImage = category.localImage
            ? category.localImage.childImageSharp.fluid
            : data.file.childImageSharp.fluid;

          return (
            <Col key={category.code} sm={6} md={4}>
              <GalleryItem>
                <Link to={`/categories/${category.code}`}>
                  <Img
                    sizes={{
                      ...fluidCategoryImage,
                      aspectRatio: 3 / 2,
                    }}
                  />

                  <Infos>{category.name}</Infos>
                </Link>
              </GalleryItem>
            </Col>
          );
        })}
      </Row>
    </Container>
  </Layout>
);

IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default IndexPage;

export const query = graphql`
  query HomePageQuery {
    file(name: { eq: "placeholder" }) {
      childImageSharp {
        fluid(maxWidth: 700) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    allCategory {
      nodes {
        id
        code
        slug
        name
        localImage {
          childImageSharp {
            fluid(maxWidth: 700) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    allProduct {
      nodes {
        slug
        name
        localImage {
          childImageSharp {
            fluid(maxWidth: 700) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;