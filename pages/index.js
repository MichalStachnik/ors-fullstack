import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

const Index = props => {
  console.log('props in index', props);
  return (
    <div>
      <Link href="/about">
        <a title="about">about</a>
      </Link>
      <p>hello index</p>
    </div>
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
