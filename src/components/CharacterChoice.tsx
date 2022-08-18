import classNames from 'classnames/bind';
// import styles from './AppHeader.module.scss';
// const cx = classNames.bind(styles);

interface Props {
  characterSelecter: (chracter: string, team: string) => void;
  team: string;
}

export function CharacterChoice({ characterSelecter, team }: Props) {
  return (
    <div className="character">
      <div>
        <div
          onClick={() => {
            characterSelecter('A', team);
          }}
        >
          A 탱크 선택
        </div>
        <div
          onClick={() => {
            characterSelecter('B', team);
          }}
        >
          B 탱크 선택
        </div>
        <div
          onClick={() => {
            characterSelecter('C', team);
          }}
        >
          C 탱크 선택
        </div>
      </div>
    </div>
  );
}
