import React from 'react';
import { Button, Radio, Switch, Checkbox } from 'antd';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questionCount: 160,
      questions: [],
      controlsVisible: true,
      showAnswer: false,

      // 两数加减
      normal: true,
      // 连续加减
      continuous: false,
    }
  }

  componentDidMount() {
    this.generateQuestions(this.state.questionCount);
  }

  generateQuestions = () => {
    const questions = [];
    for (let i = 0; i < this.state.questionCount;) {
      let number = Math.floor(Math.random() * (100));
      let result = generate([number], [], number);
      if (this.state.continuous) {
        if (!this.state.normal || Math.floor(Math.random() * 2) === 0) {
          result = generate(result.numbers, result.operations, result.answer);
        }
      }

      questions.push(result);
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

  handleQuestionCountChange = (e) => {
    const count = e.target.value;
    this.setState({
      questionCount: count,
    }, () => {
      this.generateQuestions();
    });
  };

  handleAnswerSwitch = v => {
    this.setState({
      showAnswer: v,
    })
  };

  handleNormalChange = e => {
    this.setState({
      normal: e.target.checked,
    }, () => {
      this.generateQuestions();
    });
  };

  handleContinuousChange = e => {
    this.setState({
      continuous: e.target.checked,
    }, () => {
      this.generateQuestions();
    });
  };

  render() {
    return (
      <div style={{ margin: 10 }}>
        {
          this.state.controlsVisible && (
            <div style={{ marginBottom: 10 }}>
              <Radio.Group onChange={this.handleQuestionCountChange} style={{ marginRight: 10 }} value={this.state.questionCount}>
                <Radio.Button value={80}>80题</Radio.Button>
                <Radio.Button value={160}>160题</Radio.Button>
              </Radio.Group>

              <Checkbox checked={this.state.normal} onClick={this.handleNormalChange}>两数加减</Checkbox>
              <Checkbox checked={this.state.continuous} onClick={this.handleContinuousChange}>连续加减</Checkbox>

              <Button type="primary" onClick={this.generateQuestions} style={{ marginRight: 10 }}>重新生成</Button>
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

        {
          !this.state.controlsVisible && (
            <div style={{ marginBottom: 10 }}>
              {
                [1, 2].map((v) => (
                  <span key={v} style={{ display: 'inline-block', width: '50%' }}>
                    日期:_____________ 用时:_____________ 成绩:_____________
                  </span>
                ))
              }
            </div>
          )
        }

        <div id="calculations">
          {
            this.state.questions.map((v, i) => {
              const answer = this.state.showAnswer
                ? <span style={{ color: 'red' }}>{v.answer}</span>
                : '';
              const q = (
                <span
                  key={i}
                  style={{ display: 'inline-block', width: '25%', fontSize: 16 }}
                >
                  {
                    print(v)
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

const generate = (numbers, operations, answer) => {
  const result = generateCore(answer);

  numbers = [...numbers, result.number];
  operations = [...operations, result.operation];
  answer = result.answer;

  return {
    numbers, operations, answer
  }
};

const generateCore = num1  => {
  let num2, operation;
  while(true) {
    num2 = Math.floor(Math.random() * (100));
    operation = Math.floor(Math.random() * 2) === 0 ? '+' : '-';
    if (operation === '+' && num1 + num2 > 100) {
      continue;
    }

    if (operation === '-' && num1 < num2) {
      operation = '+';
      if (num1 + num2 > 100) {
        continue;
      }
    }
    break;
  }

  let answer;
  if (operation === '+') {
    answer = num1 + num2;
  } else {
    answer = num1 - num2;
  }

  return {
    number: num2,
    operation,
    answer,
  };
};

const print = v => {
  let result = v.numbers[0];
  for (let i = 0; i < v.operations.length; i++) {
    result += ` ${v.operations[i]} ${v.numbers[i+1]}`;
  }
  result += ' = ';
  return result;
};

export default App;
