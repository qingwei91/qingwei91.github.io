package leetcode

import scala.collection.mutable

object Solution30 {
  def findSubstring(s: String, words: Array[String]): List[Int] = {
    if (words.length == 0) {
      List.empty
    } else {
      val wordSize = words(0).size
      move(s, words, wordSize)(0, Set.empty, Set.empty).toList
    }
  }

  case class Accumulate(startIdx: Int, remainingWords: mutable.Buffer[String])
  def move(
      s: String,
      words: Array[String],
      windowSize: Int
  )(
      windowStart: Int,
      acc: Set[Accumulate],
      completed: Set[Int]
  ): Set[Int] = {

    /**
      * 1. Determine current window
      * 2. Update accumulation
      *    - If we expect a word (based on StartIdx), remove acc that fail to continue
      *    - If we dont expect a word, keep the acc and move on
      * 3. Update completion
      */

    val windowEnd = windowStart + windowSize
    if (windowEnd > s.length) {
      completed
    } else {
      val currentWord = s.slice(windowStart, windowEnd)
      val curWordIdx = words.indexOf(currentWord)
      val hasWord = curWordIdx > -1

      val updatedAcc = mutable.Set.empty[Accumulate]
      acc.foreach {
        case acc @ Accumulate(startIdx, remainingWords) =>
          val distanceFromStart = windowStart - startIdx
          val shouldHaveNextWord = (distanceFromStart) % windowSize == 0

          if (shouldHaveNextWord) {
            val idxInRemaining = remainingWords.indexOf(currentWord)
            val wordInRemaining = hasWord && (idxInRemaining > -1)
            if (wordInRemaining) {
              remainingWords.remove(idxInRemaining)
              updatedAcc.add(acc)
            }
          } else {
            updatedAcc.add(acc)
          }
      }

      if (hasWord) {
        val remainingStrLen = s.length - windowStart
        val requiredMinLength = windowSize * words.length
        if (remainingStrLen >= requiredMinLength) {
          val remaining = words.toBuffer
          remaining.remove(curWordIdx)
          updatedAcc.add(Accumulate(windowStart, remaining))
        }
      }

      var updatedCompleted = completed
      updatedAcc.foreach {
        case Accumulate(startIdx, remainingWords) =>
          if (remainingWords.isEmpty) {
            updatedCompleted = updatedCompleted + startIdx
          }
      }

      move(s, words, windowSize)(
        windowStart + 1,
        updatedAcc.toSet,
        updatedCompleted
      )
    }
  }

  def main(args: Array[String]): Unit = {
    val r = findSubstring(
      "a",
      Array("a")
    )
    println(r)
  }
}
