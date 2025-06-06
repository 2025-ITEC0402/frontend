# Chapter 03 Differentiation Rules

# 미분의 응용

## 자연로그 함수와 미분

왜 미적분학에서는 다른 로그 함수($y = \log_b x$)보다 자연로그 함수($y = \ln x$)를 더 자주 사용할까요?

$y = \log_b x$를 미분하면 $\frac{dy}{dx} = \frac{1}{x \ln b}$ 입니다.  $b=e$일 때 $\ln e = 1$ 이므로 미분 공식이 $\frac{dy}{dx} = \frac{1}{x}$로 가장 간단해집니다.

## 음함수 미분과 로그 미분

### 음함수 미분

음함수 미분은 어떻게 할까요?

방정식의 양변을 $x$에 대해 미분하고, $y$를 $x$의 함수로 취급합니다. 그런 다음 결과 방정식을 $y'$에 대해 풀면 됩니다.

### 로그 미분

로그 미분은 어떻게 할까요?

로그 미분은 방정식 $y = f(x)$의 양변에 자연로그를 취하고, 로그 법칙을 사용하여 식을 간단히 한 후, $x$에 대해 음함수 미분을 하고, 결과 방정식을 $y'$에 대해 푸는 과정입니다.

## 미분의 다양한 활용

미분은 다양한 분야에서 변화율을 나타내는 데 사용됩니다.

* **물리학:** 속도, 선밀도, 전류, 전력(일의 변화율), 방사성 붕괴율 등
* **화학:** 반응 속도, 압력 하에서 물질의 압축률 등
* **생물학:** 개체군 성장률, 혈류 속도 등
* **경제학:** 다양한 경제 지표의 변화율 등

## 자연 성장 법칙

### 자연 성장 법칙을 나타내는 미분 방정식

자연 성장 법칙을 나타내는 미분 방정식은 다음과 같습니다.

$$ \frac{dy}{dt} = ky $$

여기서 $k > 0$는 상수입니다.

### 모델의 적용 조건

이 방정식은 성장을 위한 충분한 공간과 영양분이 있을 때 개체군 성장 모델로 적합합니다.

### 미분 방정식의 해

$y(0) = y_0$ 이면, 해는 다음과 같습니다.

$$ y(t) = y_0 e^{kt} $$

## 선형화와 미분

### 함수 f의 선형화

함수 $f$의 $a$에서의 선형화는 다음과 같습니다.

$$ L(x) = f(a) + f'(a)(x-a) $$

### 미분 dy

$y = f(x)$ 이면, 미분 $dy$는 다음과 같습니다.

$$ dy = f'(x) dx $$

# 미분의 응용

## 극값과 최적화

미분은 비용 증가율(생산량 증가에 따른 비용 변화율), 한계 이익 등을 측정하는 데 사용됩니다. 지질학에서의 열 흐름율, 심리학에서의 성능 향상률, 사회학에서의 소문 확산율 등 다양한 분야에서 활용되는 중요한 개념입니다.

### 절댓값 최댓값과 지역 최댓값의 차이

* **절댓값 최댓값:** 함수 f의 정의역 전체에서 가장 큰 함수값입니다.
* **지역 최댓값:** x가 c 근처에 있을 때 가장 큰 함수값입니다.

아래 그래프는 절댓값 최댓값, 지역 최댓값, 지역 최솟값을 시각적으로 나타낸 예시입니다.

### 극값 정리

**내용:** 닫힌 구간 [a, b]에서 연속인 함수 f는 항상 해당 구간에서 절댓값 최댓값과 절댓값 최솟값을 갖습니다.

**기하학적 의미:** 함수 f의 그래프에서 점 P(c, f(c)) (a ≤ c ≤ b)에서의 접선이 점 (a, f(a))와 (b, f(b))를 잇는 할선과 평행한 점이 존재합니다.

아래 그래프는 구간 [a, b]에서의 함수 f의 그래프와 구간 끝점 (a, f(a)), (b, f(b))를 잇는 할선, 그리고 그 선과 평행한 접선을 예시로 보여줍니다.

### 닫힌 구간 방법

닫힌 구간에서 연속 함수의 절댓값 최댓값과 최솟값을 찾는 방법입니다.

## 증가/감소 판정법과 오목/볼록

### 증가/감소 판정법

* **f'(x) > 0** 이면 f는 해당 구간에서 **증가**합니다.
* **f'(x) < 0** 이면 f는 해당 구간에서 **감소**합니다.

### 오목과 볼록

* 구간 I에서 **f''(x) > 0** 이면 f는 해당 구간에서 **아래로 오목**합니다. ∪
* 구간 I에서 **f''(x) < 0** 이면 f는 해당 구간에서 **위로 볼록**합니다. ∩

# 미적분학 개념 정리

## 극값 찾기

주어진 구간에서 함수의 최댓값과 최솟값을 찾는 방법은 다음과 같습니다.

* 구간 내에서 함수의 **임계점**을 찾고, 그 점에서의 함수값을 계산합니다.
* 구간의 **양 끝점**에서의 함수값을 계산합니다.
* 위 두 단계에서 계산된 값 중 가장 큰 값이 **절댓값 최댓값**, 가장 작은 값이 **절댓값 최솟값**입니다.

## 페르마의 정리와 임계점

### 페르마의 정리

함수 `f` 가 `c` 에서 극댓값 또는 극솟값을 가지고, `f'(c)` 가 존재한다면, `f'(c) = 0` 입니다.

### 임계점의 정의

함수 `f` 의 **임계점**은 `f` 의 정의역에 속하는 수 `c` 로, `f'(c) = 0` 이거나 `f'(c)` 가 존재하지 않는 경우를 말합니다.

## 롤의 정리와 평균값 정리

### 롤의 정리

함수 `f` 가 다음 세 가지 조건을 만족한다고 가정합니다.

* 닫힌 구간 `[a, b]` 에서 연속입니다.
* 열린 구간 `(a, b)` 에서 미분 가능합니다.
* `f(a) = f(b)` 입니다.

그러면 `(a, b)` 에 속하는 어떤 수 `c` 에 대해 `f'(c) = 0` 입니다.

### 평균값 정리

$$ f'(c) = \frac{f(b) - f(a)}{b - a} $$

기하학적으로, 이는 구간 `(a, b)` 에서 함수의 그래프에 접선을 그렸을 때, 그 기울기가 구간의 양 끝점을 잇는 직선의 기울기와 같은 점 `c` 가 적어도 하나 존재한다는 것을 의미합니다.

## 오목과 변곡점

### 오목 판정법

* `f''(x) > 0` 이면 함수 `f` 의 그래프는 구간에서 **위로 오목**합니다.
* `f''(x) < 0` 이면 함수 `f` 의 그래프는 구간에서 **아래로 오목**합니다.

### 변곡점

연속 함수 `f` 의 그래프에서 **변곡점**은 곡선이 위로 오목에서 아래로 오목으로, 또는 아래로 오목에서 위로 오목으로 바뀌는 점입니다. 이러한 점은 이계도함수의 부호가 바뀌는 값을 찾아서 구할 수 있습니다.

## 1계 도함수 판정법과 2계 도함수 판정법

### 1계 도함수 판정법

연속 함수 `f` 의 임계점 `c` 에 대해,

* `f'` 가 `c` 에서 양에서 음으로 바뀌면, `f` 는 `c` 에서 **극댓값**을 갖습니다.
* `f'` 가 `c` 에서 음에서 양으로 바뀌면, `f` 는 `c` 에서 **극솟값**을 갖습니다.
* `f'` 가 `c` 의 좌우에서 모두 양이거나 모두 음이면, `f` 는 `c` 에서 극값을 갖지 않습니다.

### 2계 도함수 판정법

만약 `f'(c) = 0` 이고 `f''(c)` 가 존재한다면,

* `f''(c) > 0` 이면 `f` 는 `c` 에서 **극솟값**을 갖습니다.
* `f''(c) < 0` 이면 `f` 는 `c` 에서 **극댓값**을 갖습니다.

# 평균값 정리와 그 응용

## 평균값 정리

만약 함수 $f$가 닫힌 구간 $[a, b]$에서 연속이고 열린 구간 $(a, b)$에서 미분 가능하다면, $a$와 $b$ 사이에 어떤 $c$가 존재하여 다음을 만족합니다.

$$f'(c) = \frac{f(b) - f(a)}{b - a}$$

즉, 구간의 양 끝점을 잇는 직선의 기울기와 같은 기울기를 가지는 접선이 구간 내에 적어도 하나 존재한다는 뜻입니다.

## 롤의 정리 (Rolle's Theorem)

평균값 정리의 특별한 경우로, $f(a) = f(b)$ 라면 $f'(c) = 0$ 을 만족하는 $c$가 $(a, b)$ 구간에 적어도 하나 존재한다는 것을 의미합니다. 이는 구간의 양 끝점에서의 함숫값이 같다면, 그 사이에 기울기가 0인 접선을 가진 점이 존재한다는 것을 의미합니다.

## 극값 판정을 위한 1계 도함수 검사 (First Derivative Test)

* $f'(c) = 0$ 이고 $c$의 왼쪽에서 $f'(x) > 0$, 오른쪽에서 $f'(x) < 0$ 이면, $f$는 $c$에서 극댓값을 가집니다.
* $f'(c) = 0$ 이고 $c$의 왼쪽에서 $f'(x) < 0$, 오른쪽에서 $f'(x) > 0$ 이면, $f$는 $c$에서 극솟값을 가집니다.
* $f'(c) = 0$ 이고 $c$의 양쪽에서 $f'(x)$의 부호가 바뀌지 않으면, $f$는 $c$에서 극값을 가지지 않습니다.
