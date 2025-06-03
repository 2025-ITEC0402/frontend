# Chapter 10 Vectors and the Geometry of Space

# 벡터와 평면 기하학

## 평행사변형과 평행육면체의 넓이와 부피

* **평행사변형의 넓이:** 두 벡터 $\vec{a}$와 $\vec{b}$로 결정되는 평행사변형의 넓이는 두 벡터의 외적의 크기와 같습니다. 즉, $|\vec{a} \times \vec{b}|$ 입니다.
* **평행육면체의 부피:** 세 벡터 $\vec{a}$, $\vec{b}$, $\vec{c}$로 결정되는 평행육면체의 부피는 세 벡터의 스칼라 삼중곱의 절댓값과 같습니다. 즉, $|\vec{a} \cdot (\vec{b} \times \vec{c})|$ 입니다.

## 평면에 수직인 벡터 찾기

* **평면의 방정식을 알고 있는 경우:** 평면의 방정식이 $ax + by + cz + d = 0$ 형태로 주어진다면, $\langle a, b, c \rangle$는 평면에 수직인 법선 벡터입니다. 이 벡터의 0이 아닌 스칼라 배도 법선 벡터가 됩니다.
* **평면의 방정식을 모르는 경우:** 평면 위에 있는 세 점을 이용하여 평면에 놓인 두 개의 평행하지 않은 벡터를 구할 수 있습니다. 이 두 벡터의 외적은 평면에 수직인 벡터가 됩니다.

## 두 평면 사이의 각도

두 평면이 교차하는 경우, 두 평면 사이의 각도는 각 평면의 법선 벡터 사이의 예각으로 정의됩니다. 두 법선 벡터를 $\vec{n_1}$과 $\vec{n_2}$라고 하면, 두 평면 사이의 각도 $\theta$는 다음과 같이 구할 수 있습니다.

## 세 점이 한 직선 위에 있는지 판별

세 점 P, Q, R이 한 직선 위에 있는지 확인하는 방법은 다음과 같습니다.
* 벡터 $\vec{PQ}$와 $\vec{PR}$이 평행한지 확인합니다. 만약 $\vec{PQ} = t\vec{PR}$을 만족하는 스칼라 $t$가 존재한다면, 세 점은 한 직선 위에 있습니다.
* $\vec{PQ} \times \vec{PR} = \vec{0}$이면 세 점은 한 직선 위에 있습니다.

## 네 점이 한 평면 위에 있는지 판별

네 점 P, Q, R, S가 한 평면 위에 있는지 확인하는 방법은 다음과 같습니다.
* 벡터 $\vec{PQ}$, $\vec{PR}$, $\vec{PS}$를 구합니다. $\vec{PQ} \times \vec{PR}$은 P, Q, R을 지나는 평면의 법선 벡터입니다. 만약 $(\vec{PQ} \times \vec{PR}) \cdot \vec{PS} = 0$이면, 점 S는 P, Q, R을 지나는 평면 위에 있으므로 네 점은 한 평면 위에 있습니다.

# 벡터, 직선, 평면

## 벡터의 평행성 판별

두 벡터가 (0이 아닌) 평행하려면, 한 벡터가 다른 벡터의 스칼라 배수여야 합니다.

## 직선의 방정식

* **벡터 방정식:** 벡터 $\mathbf{v}$에 평행하고 위치 벡터 $\mathbf{r}_0$를 지나는 직선의 벡터 방정식은 $\mathbf{r} = \mathbf{r}_0 + t\mathbf{v}$입니다. 여기서 $t$는 매개변수입니다.
* **매개변수 방정식:** 점 $(x_0, y_0, z_0)$를 지나고 벡터 $<a, b, c>$에 평행한 직선의 매개변수 방정식은 다음과 같습니다.
  $$x = x_0 + at$$
  $$y = y_0 + bt$$
  $$z = z_0 + ct$$
* **대칭 방정식:** 위와 같은 직선의 대칭 방정식은 다음과 같습니다.
  $$\frac{x - x_0}{a} = \frac{y - y_0}{b} = \frac{z - z_0}{c}$$

## 평면의 방정식

* **벡터 방정식:** 위치 벡터 $\mathbf{r}_0$를 지나고 법선 벡터 $\mathbf{n}$을 갖는 평면의 벡터 방정식은 $\mathbf{n} \cdot (\mathbf{r} - \mathbf{r}_0) = 0$ 또는 $\mathbf{n} \cdot \mathbf{r} = \mathbf{n} \cdot \mathbf{r}_0$입니다.
* **스칼라 방정식:** 점 $(x_0, y_0, z_0)$를 지나고 법선 벡터 $<a, b, c>$를 갖는 평면의 스칼라 방정식은 $a(x - x_0) + b(y - y_0) + c(z - z_0) = 0$입니다.

## 거리 계산

* **점과 직선 사이의 거리:** 직선 밖의 점 $P$에서 직선 $L$까지의 거리 
  직선 위의 두 점 $Q$, $R$을 잡고 $\mathbf{a} = \overrightarrow{QR}$, $\mathbf{b} = \overrightarrow{QP}$라 하면 
  거리는 $\frac{|\mathbf{a} \times \mathbf{b}|}{|\mathbf{a}|}$ 입니다.
* **점과 평면 사이의 거리:** 점 $(x_1, y_1, z_1)$에서 평면 $ax + by + cz + d = 0$까지의 거리는 $\frac{|ax_1 + by_1 + cz_1 + d|}{\sqrt{a^2 + b^2 + c^2}}$입니다.
* **두 꼬인 직선 사이의 거리:** 두 꼬인 직선 $L_1$과 $L_2$는 두 개의 평행한 평면 위에 놓여 있다고 볼 수 있습니다. 두 직선 사이의 거리는 이 두 평행한 평면 사이의 거리와 같습니다.

## 두 벡터의 평행과 수직 판별

두 개의 0이 아닌 벡터는 외적이 0이면 평행합니다.

## 곡면의 자취

곡면의 자취는 좌표 평면에 평행한 평면과 곡면의 교차 곡선입니다. x = k 평면, y = k 평면, z = k 평면에서 각각의 결과 방정식을 통해 자취를 찾을 수 있습니다.

## 이차곡면의 표준형 방정식

z축 대칭인 이차곡면의 방정식은 다음과 같습니다.
* **타원면:** $\frac{x^2}{a^2} + \frac{y^2}{b^2} + \frac{z^2}{c^2} = 1$
* **원뿔:** $\frac{z^2}{c^2} = \frac{x^2}{a^2} + \frac{y^2}{b^2}$
* **타원 포물면:** $\frac{z}{c} = \frac{x^2}{a^2} + \frac{y^2}{b^2}$
* **일엽쌍곡면:** $\frac{x^2}{a^2} + \frac{y^2}{b^2} - \frac{z^2}{c^2} = 1$
* **이엽쌍곡면:** $\frac{x^2}{a^2} + \frac{y^2}{b^2} - \frac{z^2}{c^2} = -1`
* **쌍곡 포물면:** $\frac{z}{c} = \frac{x^2}{a^2} - \frac{y^2}{b^2}$

## 벡터 함수와 공간 곡선

벡터 함수는 각 성분별로 미분·적분하며, 연속 벡터 함수 $\mathbf{r}(t)$의 끝점이 공간 곡선을 그립니다.

접선 벡터는 $\mathbf{r}'(t)$, 단위 접선 벡터는 $\mathbf{T}(t)=\frac{\mathbf{r}'(t)}{|\mathbf{r}'(t)|}$입니다.

## 공간 곡선의 길이와 곡률

곡선의 길이: $\mathbf{r}(t)=\langle f(t),g(t),h(t)\rangle$, $a\le t\le b$인 경우
$$L=\int_a^b|\mathbf{r}'(t)|dt=\int_a^b\sqrt{[f'(t)]^2+[g'(t)]^2+[h'(t)]^2}\,dt$$

곡률 정의: $\kappa=\left|\frac{d\mathbf{T}}{ds}\right|$,
곡률 공식: $\kappa=\frac{|\mathbf{T}'(t)|}{|\mathbf{r}'(t)|}$ 또는 $\kappa=\frac{|\mathbf{r}'(t)\times\mathbf{r}''(t)|}{|\mathbf{r}'(t)|^3}$
평면 곡선 $y=f(x)$의 경우 $\kappa(x)=\frac{|f''(x)|}{(1+[f'(x)]^2)^{3/2}}$.

## 법선 벡터와 종법선 벡터

단위 법선 벡터 $\mathbf{N}(t)=\frac{\mathbf{T}'(t)}{|\mathbf{T}'(t)|}$, 종법선 벡터 $\mathbf{B}(t)=\mathbf{T}(t)\times \mathbf{N}(t)$.

## 법평면, 접촉평면, 접촉원

법평면: 법선 벡터와 종법선 벡터가 결정하는 평면입니다.
접촉평면: 접선 벡터와 법선 벡터가 결정하는 평면입니다.
접촉원: 곡률의 역수 반지름을 가지며 곡선과 접선·법선을 공유하는 원입니다.

## 벡터 함수의 미분 법칙

* 합의 미분: $(\mathbf{u}+\mathbf{v})'=\mathbf{u}'+\mathbf{v}'`
* 상수배 미분: $(c\mathbf{u})'=c\mathbf{u}'`
* 곱 미분: $(f\mathbf{u})'=f'\mathbf{u}+f\mathbf{u}'`
* 내적 미분: $(\mathbf{u}\cdot\mathbf{v})'=\mathbf{u}'\cdot\mathbf{v}+\mathbf{u}\cdot\mathbf{v}'`
* 외적 미분: $(\mathbf{u}\times\mathbf{v})'=\mathbf{u}'\times\mathbf{v}+\mathbf{u}\times\mathbf{v}'`
* 연쇄 법칙: $(\mathbf{u}\circ f)'=f'\mathbf{u}'(f)`
