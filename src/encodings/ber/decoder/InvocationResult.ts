import * as Ber from '../../../Ber'
import { InvocationResult, InvocationResultImpl } from '../../../model/InvocationResult'
import { EmberTypedValue } from '../../../types/types'
import { InvocationResultBERID } from '../constants'

export function decodeInvocationResult(reader: Ber.Reader): InvocationResult {
	const ber = reader.getSequence(InvocationResultBERID)
	let id: number | null = null
	let success: boolean | undefined = undefined
	let result: Array<EmberTypedValue> | undefined = undefined
	while (ber.remain > 0) {
		const tag = ber.peek()
		const seq = ber.getSequence(tag!)
		switch (tag) {
			case Ber.CONTEXT(0):
				id = seq.readInt()
			  break
			case Ber.CONTEXT(1):
				success = seq.readBoolean()
			  break
			case Ber.CONTEXT(2):
				result = []
				let resSeq = seq.getSequence(Ber.BERDataTypes.SEQUENCE)
				while (resSeq.remain > 0) {
					const resTag = resSeq.peek()
					const faSeq = resSeq.getSequence(resTag!)
					if (resTag !== Ber.CONTEXT(0)) {
						throw new Error(``)
					}
					result.push(faSeq.readValue())
				}
			  break
			default:
				throw new Error(``)
		}
	}
	if (id === null) {
		throw new Error(``)
	}
	return new InvocationResultImpl(id, success, result)
}
