package com.remo.registration;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.sun.istack.internal.Nullable;
import org.immutables.value.Value;
import org.springframework.security.core.userdetails.UserDetails;

@Value.Immutable
@JsonSerialize(as = ImmutableUser.class)
@JsonDeserialize(builder = ImmutableUser.Builder.class)
public interface User extends UserDetails {
    @Nullable
    String firstName();

    @Nullable
    String lastName();

    @Nullable
    String email();

    @Nullable
    String occupation();

}
