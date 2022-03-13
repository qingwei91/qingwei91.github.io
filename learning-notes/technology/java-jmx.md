## Java JMX

JMX is Java Management Extension, it is a set of tools that provides monitoring for JVM.

It works by exposing a port from JVM, then client can retrieve information from the port.

You typically configure it by setting options when starting JVM, for example

```bash
java -Dcom.sun.management.jmxremote \
  -Dcom.sun.management.jmxremote.port=9010 \
  -Dcom.sun.management.jmxremote.local.only=false \
  -Dcom.sun.management.jmxremote.authenticate=false \
  -Dcom.sun.management.jmxremote.ssl=false \
  -jar Notepad.jar
```

Then a client can access JMX information by hitting the port, it can be access from remote (depends on configuration).

JMX work by exposing metrics of JVM, and these metrics come from something called MXBean, MX stands for ManagementExtension. They can be think of bags of values, implemented as JVM objects with Getters and Setters.

Ref: https://docs.oracle.com/javase/tutorial/jmx/mbeans/mxbeans.html

By adhering to MXBean interface, JVM can expose information to JMX client with loose coupling.

One can find existing MXBeans, which can be expose to JMX client by using `java.lang.management.ManagementFactory`, here's a sample snippet:

```scala
import java.lang.management.ManagementFactory
import scala.jdk.CollectionConverters._

ManagementFactory.getGarbageCollectorMXBeans().asScala.map(_.getName)
// ArrayBuffer("scavenge", "global")
```

By accessing `ManagementFactory`, we can read and write to the MXBean server, which is used to expose to JMX port.