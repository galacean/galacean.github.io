---
order: 3
title: Event
type: Tool
---

The engine provides a basic event system, general communication between components, **game and business** communication will consider the use of event system. The engine provides [EventDispatcher](${api}core/EventDispatcher) as the event class, and [Engine](${api}core/Engine) and [Entity](${api}core/Entity) inherit from `EventDispatcher`.

> **Note**: In general, it is recommended to use [script component](${docs}script) to solve the communication problem between components in the game. The event system is only recommended for use in some scenarios that require decoupling.

## Add event listener

- Use [on](${api}core/EventDispatcher#on) to monitor:

  ```typescript
  this.engine.on("event-test", () => {
    console.log("call event-test");
  });
  ```

- Use [once](${api}core/EventDispatcher#once) to listen, the callback function will only be triggered once:

  ```typescript
  this.engine.once("event-test", () => {
    console.log("call event-test");
  });
  ```

## Remove event listener

```typescript
// Remove the specific function "fun" that listen to "event-test".
this.engine.off("event-test", fun);
// Remove all functions that listen to "event-test".
this.engine.off("event-test");
```

## Event dispatch

The event can be dispatched by calling the [dispatch](${api}core/EventDispatcher#dispatch) method, and dispatching the corresponding event will trigger the execution of the listener event callback function.

```typescript
this.engine.dispatch("event-test", { eventData: "mydata" });
```

## Callback parameter

The callback parameters are the same as those carried when sending.
