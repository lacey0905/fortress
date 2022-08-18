import classNames from 'classnames/bind';
import { useCallback, useEffect, useState } from 'react';
import styles from './App.module.scss';

import { Unity, useUnityContext } from 'react-unity-webgl';

const cx = classNames.bind(styles);

export function App() {
  const [currentModel, setCurrentModel] = useState(0);
  const [ready, setReady] = useState(false);
  const [gameDisplay, setGameDisplay] = useState(true);
  const [choiceView, setChoiceView] = useState(true);
  const [gameEnd, setGameEnd] = useState(false);
  const [loading, setLoading] = useState(true);

  const { unityProvider, sendMessage, addEventListener, removeEventListener } =
    useUnityContext({
      loaderUrl: 'Build/build.loader.js',
      dataUrl: 'Build/build.data',
      frameworkUrl: 'Build/build.framework.js',
      codeUrl: 'Build/build.wasm',
    });

  function GameStart() {
    setReady(true);
    setGameDisplay(true);
    setChoiceView(false);
    sendMessage('GameManager', 'GameStart', currentModel);
  }

  const handleGameOver = useCallback(() => {
    setReady(false);
    setGameDisplay(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setGameEnd(true);
    }, 1500);
  }, []);

  const handleLoading = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    addEventListener('CallReact', handleGameOver);
    addEventListener('CallLoading', handleLoading);
    return () => {
      removeEventListener('CallReact', handleGameOver);
      removeEventListener('CallLoading', handleLoading);
    };
  }, [addEventListener, removeEventListener]);

  return (
    <div className={cx('container')}>
      {loading && <div className={cx('loading')}>Loading...</div>}
      {!loading && gameEnd && !choiceView && (
        <div className={cx('gameEnd')} data-temp={gameEnd}>
          <h2 className={cx('title')}>당신의 승리 입니다!</h2>
          <button
            className={cx('reGameButton')}
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
                setGameEnd(false);
                setChoiceView(true);
              }, 1500);
            }}
          >
            게임 다시하기
          </button>
        </div>
      )}
      {!loading && choiceView && (
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
          >
            GAME START
          </button>
        </div>
      )}
      <div className={cx('gameView')}>
        {gameDisplay && !loading && ready && (
          <h2 className={cx('title')}>지금은 Unity 입니다.</h2>
        )}
        {gameDisplay && !loading && ready && (
          <p className={cx('subTitle')}>
            빨간색 : HP
            <br />
            초록색 : 파워
            <br />
            노란색 : 스테미너
          </p>
        )}
        <div data-unity-state={ready}>
          <Unity
            unityProvider={unityProvider}
            style={{
              width: '1280px',
              height: '720px',
              display: gameDisplay ? 'block' : 'none',
            }}
          />
        </div>
      </div>
    </div>
  );
}
