object Solution32 {
  def longestValidParentheses(s: String): Int = {
    val sLen = s.length
    var unmatchedParens = List.empty[Char]
    var largestConsecParens = 0
    var currentClosedConsecParens = 0
    var currentOpenConsecParens = 0
    for (i <- 0 until sLen) {
      unmatchedParens.headOption match {
        case None => unmatchedParens = s(i) :: Nil
        case Some(lastParen) =>
          (lastParen, s(i)) match {
            case ('(', ')') =>
              unmatchedParens = unmatchedParens.tail
              if (unmatchedParens.isEmpty) {
                currentOpenConsecParens += 2
                currentClosedConsecParens += currentOpenConsecParens
              }

              largestConsecParens =
                math.max(largestConsecParens, currentClosedConsecParens)

            case ('(', '(') =>
              unmatchedParens = '(' :: unmatchedParens

            case (')', _) =>
              unmatchedParens = '(' :: Nil
              currentClosedConsecParens = 0
            case _ => throw new Exception("Unexpected char")
          }
      }
    }
    largestConsecParens
  }
}
