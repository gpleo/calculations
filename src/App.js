import React from 'react';
import { Button, Radio, Switch } from 'antd';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questionCount: 80,
      questions: [],
      controlsVisible: true,
      showAnswer: false,
    }
  }

  componentDidMount() {
    this.generateQuestions(this.state.questionCount);
  }

  generateQuestions = (count) => {
    const questions = [];
    for (let i = 0; i < count;) {
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
    });
  };

  print = () => {
    this.setState({
      controlsVisible: false,
    }, () => {
      window.print();
      this.setState({
        controlsVisible: true,
      });
    });
  };

  refresh = () => {
    this.generateQuestions(this.state.questionCount);
  };

  handleQuestionCountChange = (e) => {
    const count = e.target.value;
    this.setState({
      questionCount: count,
    });
    this.generateQuestions(count);
  };

  handleAnswerSwitch = v => {
    this.setState({
      showAnswer: v,
    })
  };

  render() {
    return (
      <div style={{ margin: 10 }}>
        {
          this.state.controlsVisible && (
            <div style={{ marginBottom: 10 }}>
              <Radio.Group onChange={this.handleQuestionCountChange} style={{ marginRight: 10 }} value={this.state.questionCount}>
                <Radio.Button value={20}>20题</Radio.Button>
                <Radio.Button value={50}>50题</Radio.Button>
                <Radio.Button value={80}>80题</Radio.Button>
                <Radio.Button value={100}>100题</Radio.Button>
                <Radio.Button value={200}>200题</Radio.Button>
              </Radio.Group>
              <Button type="primary" onClick={this.refresh} style={{ marginRight: 10 }}>重新生成</Button>
              <Button type="primary" onClick={this.print} style={{ marginRight: 10 }}>打印</Button>
              <Switch
                checked={this.state.showAnswer}
                onChange={this.handleAnswerSwitch}
                style={{ marginRight: 10 }}
                checkedChildren="显示答案"
                unCheckedChildren="隐藏答案"
              />
            </div>
          )
        }
        <div id="calculations">
          {
            this.state.questions.map((v, i) => {
              const answer = this.state.showAnswer
                ? <span style={{ color: 'red' }}>{v[3]}</span>
                : '';
              const q = (
                <span
                  key={i}
                  style={{ display: 'inline-block', width: '25%' }}
                >
                  {
                    `${v[0]} ${v[2] === 0 ? '+' : '-'} ${v[1]} = `
                  }
                  {answer}
                </span>
              );
              if (i > 0 && i % 4 === 0) {
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
