import React from 'react';
import { Button } from 'antd';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
    }
  }

  componentDidMount() {
    const questions = [];
    for (let i = 0; i < 100;) {
      let s1 = Math.floor(Math.random() * (100));
      let s2 = Math.floor(Math.random() * (100));
      const s3 = Math.floor(Math.random() * 2);
      let answer;
      if (s3 === 0 && s1 + s2 > 100) {
        continue;
      }

      if (s3 === 1 && s1 < s2) {
        const s = s1;
        s1 = s2;
        s2 = s;
      }

      if (s3 === 0) {
        answer = s1 + s2;
      } else {
        answer = s1 - s2;
      }

      questions.push([s1, s2, s3, answer]);
      i++;
    }
    this.setState({
      questions,
    })
  }

  print = () => {
    const currentInnerHTML = window.document.body.innerHTML;
    window.document.body.innerHTML = window.document.getElementById('calculations').innerHTML;
    window.print();
    window.document.body.innerHTML = currentInnerHTML;
  };

  render() {
    return (
      <div style={{ margin: 10 }}>
        <Button type="primary" onClick={this.print} style={{ marginBottom: 10 }}>打印</Button>
        <div id="calculations">
          {
            this.state.questions.map((v, i) => {
              const q = <span key={i} style={{ display: 'inline-block', width: '25%' }}>{`${v[0]} ${v[2] === 0 ? '+' : '-'} ${v[1]} = ${v[3]}`}</span>;
              if (i % 4 === 0) {
                return [<br key={`br${i}`}/>, q];
              }
              return q;
            })
          }
        </div>
      </div>
    );
  }
}

export default App;
