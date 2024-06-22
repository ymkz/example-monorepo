// @generated by protoc-gen-connect-es v1.4.0 with parameter "target=ts"
// @generated from file proto/user/v1/service.proto (package user.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { MethodKind } from '@bufbuild/protobuf'
import {
	CreateUserRequest,
	CreateUserResponse,
	DeleteUserRequest,
	DeleteUserResponse,
	FindUserRequest,
	FindUserResponse,
	SearchUserRequest,
	SearchUserResponse,
	UpdateUserRequest,
	UpdateUserResponse,
} from './service_pb.js'

/**
 * @generated from service user.v1.UserService
 */
export const UserService = {
	typeName: 'user.v1.UserService',
	methods: {
		/**
		 * @generated from rpc user.v1.UserService.SearchUser
		 */
		searchUser: {
			name: 'SearchUser',
			I: SearchUserRequest,
			O: SearchUserResponse,
			kind: MethodKind.Unary,
		},
		/**
		 * @generated from rpc user.v1.UserService.FindUser
		 */
		findUser: {
			name: 'FindUser',
			I: FindUserRequest,
			O: FindUserResponse,
			kind: MethodKind.Unary,
		},
		/**
		 * @generated from rpc user.v1.UserService.CreateUser
		 */
		createUser: {
			name: 'CreateUser',
			I: CreateUserRequest,
			O: CreateUserResponse,
			kind: MethodKind.Unary,
		},
		/**
		 * @generated from rpc user.v1.UserService.UpdateUser
		 */
		updateUser: {
			name: 'UpdateUser',
			I: UpdateUserRequest,
			O: UpdateUserResponse,
			kind: MethodKind.Unary,
		},
		/**
		 * @generated from rpc user.v1.UserService.DeleteUser
		 */
		deleteUser: {
			name: 'DeleteUser',
			I: DeleteUserRequest,
			O: DeleteUserResponse,
			kind: MethodKind.Unary,
		},
	},
} as const