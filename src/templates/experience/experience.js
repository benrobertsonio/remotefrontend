import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import PostListing from '../../components/post-listing/post-listing';
import moment from 'moment';
import styles from './experience.module.scss';

const Experience = ({ data }) => {
  const mostRecent = data.jobs.nodes[0];
  const companies = data.jobs.nodes.map((job) => job.acf.company).slice(0, 3);
  console.log(companies);

  return (
    <>
      <Helmet
        title={`${
          data.term.name
        } Remote Front End Developer Jobs | Front End Remote Jobs`}
        meta={[
          {
            name: 'description',
            description: `${data.jobs.nodes.length} ${
              data.term.name
            } remote front end developer jobs at companies like ${companies.join(
              ', '
            )}, last posted ${moment(mostRecent.posted).fromNow()}`
          }
        ]}
      />
      <h1 className={styles.title}>
        {data.term.name} Remote Front End Developer Jobs
      </h1>
      <p className={styles.description}>
        {data.jobs.nodes.length} <strong>{data.term.name.toLowerCase()}</strong>{' '}
        remote front end developer jobs. Companies like{' '}
        <strong>{companies.join(', ')}</strong> are hiring {data.term.name}{' '}
        remote front end developers, last posted{' '}
        {moment(mostRecent.posted).fromNow()}.
      </p>
      <section className={styles.jobs}>
        {data.jobs.nodes.map((job) => (
          <PostListing
            key={job.id}
            post={{
              title: job.title,
              path: job.acf.apply_url,
              company: job.acf.company,
              snippet: job.excerpt,
              date: moment(job.posted).fromNow(),
              slug: job.slug
            }}
          />
        ))}
      </section>
    </>
  );
};

Experience.propTypes = {};

export default Experience;

export const query = graphql`
  query ExpQuery($id: Int!) {
    jobs: allWordpressWpJobs(filter: { experience: { eq: $id } }) {
      nodes {
        id
        title
        excerpt
        slug
        posted: date
        date
        acf {
          apply_url
          company
          featured
        }
      }
    }
    term: wordpressWpExperience(wordpress_id: { eq: $id }) {
      name
      id
      path
      slug
      wordpress_id
    }
  }
`;
