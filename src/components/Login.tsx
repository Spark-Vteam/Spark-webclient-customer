// importing Link from react-router-dom to navigate to
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Login = () => {
  function loginUser() {
    console.log('inloggad');
  }

  return (
    <div>
      <button className='btn-login margin-top' onClick={loginUser}>
        Login with GitHub <FontAwesomeIcon icon={faGithub} />
      </button>
      {/* <a
        className='btn'
        href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}?path=${PATH}&scope=user:email`}
      >
        Login with Github
      </a> */}
    </div>
  );
};

export default Login;
