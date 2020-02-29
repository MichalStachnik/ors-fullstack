import Head from 'next/head';
import Navbar from './Navbar';

interface Props {
  onInputChanged: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
}

const Layout: React.FC<Props> = props => (
  <div>
    <Head>
      <title>One Random Sample</title>
      {/* jQuery */}
      <script
        src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossOrigin="anonymous"
      ></script>

      {/* Popper.js */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js"></script>

      {/*  Bootstrap */}
      <script
        src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
        integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
        crossOrigin="anonymous"
      ></script>
      <link
        rel="stylesheet"
        href="https://bootswatch.com/4/materia/bootstrap.min.css"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css"
      />
    </Head>
    <Navbar
      onInputCleared={() => undefined}
      onInputChanged={evt => props.onInputChanged(evt)}
      searchValue={props.searchValue}
    />
    <div className="container">{props.children}</div>
    <style jsx global>
      {`
        html {
          overflow-y: scroll;
          box-sizing: border-box;
          padding: 0;
          margin: 0;
        }

        :root {
          --dark: #2d2d2d;
        }

        #__next {
          background: var(--dark);
          min-height: 100vh;
          position: relative;
        }

        .container {
          padding-bottom: 10px;
        }

        .form-control::placeholder {
          color: #666;
        }
      `}
    </style>
  </div>
);

export default Layout;
