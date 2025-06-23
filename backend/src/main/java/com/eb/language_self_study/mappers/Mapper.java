package com.eb.language_self_study.mappers;

public interface Mapper <A, B> {
    A mapToDto(B b);

    B mapFromDto(A a);

}
