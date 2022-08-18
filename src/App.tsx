import classNames from 'classnames/bind';
import { useCallback, useEffect, useState } from 'react';
import styles from './App.module.scss';

import { Unity, useUnityContext } from 'react-unity-webgl';

const cx = classNames.bind(styles);

export function App() {
  const [currentModel, setCurrentModel] = useState(0);

  const [gameStart, setGameStart] = useState(false);
  const [gameEnd, setGameEnd] = useState(false);

  const { unityProvider, sendMessage, addEventListener, removeEventListener } =
    useUnityContext({
      loaderUrl: 'Build/build.loader.js',
      dataUrl: 'Build/build.data',
      frameworkUrl: 'Build/build.framework.js',
      codeUrl: 'Build/build.wasm',
    });

  function GameStart() {
    setGameStart(true);
    sendMessage('GameManager', 'GameStart', currentModel);
  }

  const handleGameOver = useCallback(() => {
    setGameStart(false);
    setGameEnd(true);
  }, []);

  useEffect(() => {
    addEventListener('CallReact', handleGameOver);
    return () => {
      removeEventListener('CallReact', handleGameOver);
    };
  }, [addEventListener, removeEventListener, handleGameOver]);

  return (
    <div className={cx('container')}>
      {gameEnd && (
        <div className={cx('gameEnd')}>
          <h2 className={cx('title')}>당신의 승리 입니다!</h2>
          <button
            className={cx('reGameButton')}
            onClick={() => {
              setGameEnd(false);
              setGameStart(false);
            }}
          >
            게임 다시하기
          </button>
        </div>
      )}
      {!gameStart && !gameEnd && (
        <div className={cx('character')} data-on={currentModel}>
          <h2 className={cx('title')}>지금은 React 입니다.</h2>
          <p className={cx('subTitle')}>탱크를 선택 하세요.</p>
          <div
            className={cx('tank')}
            data-tank="0"
            onClick={() => {
              setCurrentModel(0);
            }}
          ></div>
          <div
            className={cx('tank')}
            data-tank="1"
            onClick={() => {
              setCurrentModel(1);
            }}
          ></div>
          <div
            className={cx('tank')}
            data-tank="2"
            onClick={() => {
              setCurrentModel(2);
            }}
          ></div>
          <button
            type="button"
            className={cx('gameStartButton')}
            onClick={GameStart}
            data-show={gameStart}
          >
            GAME START
          </button>
        </div>
      )}
      <div className={cx('gameView')}>
        {gameStart && <h2 className={cx('title')}>지금은 Unity 입니다.</h2>}
        {gameStart && (
          <p className={cx('subTitle')}>
            빨간색 : HP
            <br />
            초록색 : 파워
            <br />
            노란색 : 스테미너
          </p>
        )}
        <Unity
          unityProvider={unityProvider}
          style={{
            width: '1280px',
            height: '720px',
            display: gameStart ? 'block' : 'none',
          }}
        />
      </div>
    </div>
  );
}
