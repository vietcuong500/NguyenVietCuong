# 99Tech Code Challenge #1 #

Note that if you fork this repository, your responses may be publicly linked to this repo.  
Please submit your application along with the solutions attached or linked.   

It is important that you minimally attempt the problems, even if you do not arrive at a working solution.

## Submission ##
You can either provide a link to an online repository, attach the solution in your application, or whichever method you prefer.
We're cool as long as we can view your solution without any pain.


# Problem 3 #
## Tổng hợp các lỗi trong `WalletPage`

### 1. Kế thừa `FormattedWalletBalance` từ `WalletBalance`
#### **Vấn đề**
- `FormattedWalletBalance` và `WalletBalance` đều có các trường `currency` và `amount`, dẫn đến lặp code.

#### **Giải pháp**
- Kế thừa `FormattedWalletBalance` từ `WalletBalance` để tái sử dụng code:

```typescript
interface WalletBalance {
  currency: string;
  amount: number;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}
```

---

### 2. Sử dụng `enum` thay vì `any` cho `blockchain`
#### **Vấn đề**
- Tham số `blockchain` trong `getPriority` có kiểu `any`, dễ gây lỗi.

#### **Giải pháp**
- Định nghĩa `enum` cho blockchain để đảm bảo an toàn kiểu dữ liệu:

```typescript
enum Blockchain {
  Osmosis = 'Osmosis',
  Ethereum = 'Ethereum',
  Arbitrum = 'Arbitrum',
  Zilliqa = 'Zilliqa',
  Neo = 'Neo'
}
```

- Sử dụng `Blockchain` trong `getPriority`:

```typescript
const getPriority = (blockchain: Blockchain): number => {
  switch (blockchain) {
    case Blockchain.Osmosis:
      return 100;
    case Blockchain.Ethereum:
      return 50;
    case Blockchain.Arbitrum:
      return 30;
    case Blockchain.Zilliqa:
    case Blockchain.Neo:
      return 20;
    default:
      return -99;
  }
};
```

---

### 3. Lỗi biến `lhsPriority` không được định nghĩa & tối ưu `filter`
#### **Vấn đề**
- Biến `lhsPriority` không tồn tại, gây lỗi runtime.
- Cấu trúc `if` lồng nhau làm giảm khả năng đọc code.

#### **Giải pháp**
- Sửa lỗi bằng cách sử dụng biến `balancePriority` và viết `filter` gọn hơn:

```typescript
const sortedBalances = useMemo(() => {
  return balances
    .filter((balance) => {
      const balancePriority = getPriority(balance.blockchain);
      return balancePriority > -99 && balance.amount <= 0;
    })
    .sort((lhs, rhs) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain));
}, [balances, getPriority]);
```

---

### 4. Loại bỏ `prices` khỏi dependencies của `useMemo`
#### **Vấn đề**
- `prices` được thêm vào dependencies của `useMemo`, nhưng không được sử dụng.
- `getPriority` cần có trong dependencies vì nó được gọi trong `useMemo`.

#### **Giải pháp**
- Loại bỏ `prices`, thêm `getPriority` vào dependencies:

```typescript
const sortedBalances = useMemo(() => {
  return balances
    .filter((balance) => getPriority(balance.blockchain) > -99)
    .sort((lhs, rhs) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain));
}, [balances, getPriority]);
```

---

### 5. Xử lý trường hợp `leftPriority === rightPriority` trong `sort`
#### **Vấn đề**
- Khi `leftPriority === rightPriority`, hàm `sort` không trả về giá trị nào, có thể gây lỗi sắp xếp không ổn định.

#### **Giải pháp**
- Trả về `leftPriority - rightPriority` để đảm bảo sắp xếp ổn định:

```typescript
.sort((lhs, rhs) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain));
```

---

### 6. Sử dụng `toFixed()` nhưng không truyền tham số
#### **Vấn đề**
- `toFixed()` không truyền tham số sẽ gây lỗi hoặc không đảm bảo số chữ số mong muốn.

#### **Giải pháp**
- Truyền số chữ số thập phân mong muốn, chẳng hạn `toFixed(2)`:

```typescript
formatted: balance.amount.toFixed(2)
```

---

### 7. Biến `formattedBalances` khai báo nhưng không sử dụng
#### **Vấn đề**
- `formattedBalances` được khai báo nhưng không được sử dụng, gây dư thừa.

#### **Giải pháp**
- Loại bỏ `formattedBalances` và thực hiện định dạng ngay trong `map()` khi render:

```typescript
const rows = sortedBalances.map((balance) => (
  <WalletRow 
    key={balance.currency} // Sử dụng currency thay vì index
    className={classes.row}
    amount={balance.amount}
    usdValue={prices[balance.currency] * balance.amount}
    formattedAmount={balance.amount.toFixed(2)}
  />
));
```

---

### 8. Lặp nhiều lần trên cùng một dữ liệu
#### **Vấn đề**
- Hiện tại, dữ liệu bị lặp nhiều lần qua `.filter()`, `.sort()`, `.map()` hai lần.

#### **Giải pháp**
- Gộp xử lý vào một vòng lặp duy nhất:
- Có thể thay thế map và filter bằng reduce để giảm số lần lặp. Tôi sẽ trình bày sau

```typescript
const processedBalances = useMemo(() => {
  return balances
    .filter((balance) => getPriority(balance.blockchain) > -99 && balance.amount > 0)
    .sort((lhs, rhs) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain))
    .map((balance) => ({
      ...balance,
      formatted: balance.amount.toFixed(2)
    }));
}, [balances, getPriority]);
```

---

### 9. Không nên sử dụng `index` làm `key`
#### **Vấn đề**
- Sử dụng `index` làm `key` có thể gây lỗi khi danh sách thay đổi.

#### **Giải pháp**
- Sử dụng `balance.currency` và `balance.blockchain` làm `key` thay vì `index`:

```typescript
const rows = processedBalances.map((balance) => (
  <WalletRow 
    key={`${balance.blockchain}-${balance.currency}`}
    className={classes.row}
    amount={balance.amount}
    usdValue={prices[balance.currency] * balance.amount}
    formattedAmount={balance.formatted}
  />
));
```


