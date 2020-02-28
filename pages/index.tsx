import { NextPage } from 'next';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

import Layout from '../components/Layout';

const Index: NextPage = props => {
  return (
    <Layout>
      <div>
        <Link href="/about">
          <a title="about">about</a>
        </Link>
        <p>hello index</p>
      </div>
    </Layout>
  );
};

Index.getInitialProps = async function() {
  const res = await fetch('http://localhost:5000/polls');
  const { polls } = await res.json();

  console.log('in getInitialProps');

  return {
    polls
  };
};

export default Index;
