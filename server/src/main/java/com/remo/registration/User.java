package com.remo.registration;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.sun.istack.internal.Nullable;
import org.hibernate.validator.constraints.NotEmpty;
import org.immutables.value.Value;
import org.springframework.security.core.userdetails.UserDetails;

import javax.validation.constraints.Size;

@Value.Immutable
@JsonSerialize(as = ImmutableUser.class)
@JsonDeserialize(builder = ImmutableUser.Builder.class)
public interface User extends UserDetails {
    @NotEmpty
    @Size(max = 255)
    String firstName();

    @NotEmpty
    @Size(max = 255)
    String lastName();

    @Nullable
    @Size(max = 255)
    String email();

    @Nullable
    String occupation();

}
